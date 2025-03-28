import { createContext, useContext } from 'react';

export const Neo4jContext = createContext(null);

export const useNeo4j = () => useContext(Neo4jContext);

// DBQueries-klasse med metoder for å interagere med Neo4j
class DBQueries {
  constructor(driver) {
    this.driver = driver;
  }

  // Kjør Cypher-spørring mot Neo4j
  async executeCypher(cypher, params = {}) {
    if (!this.driver) {
      throw new Error("No active Neo4j connection");
    }

    const session = this.driver.session();
    try {
      const result = await session.run(cypher, params);
      return result.records;
    } catch (error) {
      console.error("Neo4j Query Error:", error);
      throw error;
    } finally {
      await session.close();
    }
  }

  // Hent alle kategori-IDer
  async getAllCategoryIds() {
    const cypher = "MATCH (k:Kategori) RETURN k.kategori_id";
    const records = await this.executeCypher(cypher);
    return records.map(record => record.get('k.kategori_id'));
  }

  // Hent kortinformasjon basert på kort-ID
  async getCardById(cardId) {
    const cypher = `
      MATCH (k:Kort {kort_id: $cardId})
      MATCH (k)-[:TILHØRER]->(kat:Kategori)
      MATCH (k)-[:HAR]->(s:Spørsmål)
      MATCH (k)-[:HAR]->(a:Alternativ)
      OPTIONAL MATCH (k)-[:HAR]->(f:Forklaring)
      OPTIONAL MATCH (k)-[:HAR]->(t:Tiltak)
      RETURN 
        k.kort_id AS id,
        k.poeng AS poeng,
        k.state AS state,
        kat.tekst AS kategori_tekst,
        s.tekst AS sporsmal_tekst,
        a.tekst AS alternativ_tekst,
        a.poeng AS alternativ_poeng,
        COALESCE(k.bruker_poeng, 0) AS bruker_poeng,
        COALESCE(f.tekst, '') AS forklaringer,
        COALESCE(t.tekst, '') AS tiltak
    `;

    const records = await this.executeCypher(cypher, { cardId });
    
    if (records.length === 0) {
      return null;
    }
    
    return records[0].toObject();
  }

  // Oppdater kortstatus (avhuket/ikke_avhuket)
  async updateCardState(cardId, state) {
    const cypher = `
      MATCH (k:Kort {kort_id: $cardId})
      SET k.state = $state
      RETURN k.kort_id AS id, k.state AS state
    `;
    
    const records = await this.executeCypher(cypher, { cardId, state });
    return records[0].toObject();
  }

  // Hent alle kort
  async getAllCards() {
    const cypher = `
      MATCH (k:Kort)
      RETURN k.kort_id AS id
    `;
    
    const records = await this.executeCypher(cypher);
    return records.map(record => record.get('id'));
  }
  
  // Beregn brukerpoeng
  async calculateUserPoints() {
    const cypher = `
      MATCH (k:Kort)
      WHERE k.state = 'avhuket'
      RETURN SUM(k.poeng) + SUM(COALESCE(k.alternativ_poeng, 0)) AS totalPoints
    `;
    
    const records = await this.executeCypher(cypher);
    return records[0].get('totalPoints') || 0;
  }
}

export default DBQueries;