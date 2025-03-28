// DBQueries.js
// DBQueries-klasse med metoder for å interagere med Neo4j
class DBQueries {
  constructor(driver) {
    this.driver = driver;
    // Cache for spørringer
    this.cache = {
      categoryIds: null,
      cards: null
    };
    console.log("DBQueries initialized with driver (EN GANG)");
  }

  // Kjør Cypher-spørring mot Neo4j med caching
  async executeCypher(cypher, params = {}, cacheKey = null) {
    if (!this.driver) {
      throw new Error("No active Neo4j connection");
    }

    // Sjekk om resultat er cachet
    if (cacheKey && this.cache[cacheKey]) {
      console.log(`Returning cached result for: ${cacheKey}`);
      return this.cache[cacheKey];
    }

    console.log(`Executing cypher: ${cypher.substring(0, 50)}...`);
    
    const session = this.driver.session();
    try {
      const result = await session.run(cypher, params);
      
      // Lagre resultat i cache hvis cacheKey er angitt
      if (cacheKey) {
        this.cache[cacheKey] = result.records;
      }
      
      return result.records;
    } catch (error) {
      console.error("Neo4j Query Error:", error);
      throw error;
    } finally {
      await session.close();
    }
  }

  // Hent alle kategori-IDer med caching
  async getAllCategoryIds() {
    // Hvis vi allerede har fetched, returner cached data
    if (this.cache.categoryIds) {
      console.log("Returning cached category IDs");
      return this.cache.categoryIds;
    }

    const cypher = "MATCH (k:Kategori) RETURN k.kategori_id";
    console.log("Getting all category IDs (første gang)");
    const records = await this.executeCypher(cypher, {}, 'categoryIds');
    
    // Behandle og cache resultatet
    const categoryIds = records.map(record => record.get('k.kategori_id'));
    this.cache.categoryIds = categoryIds;
    
    console.log("Category IDs fetched:", categoryIds.length);
    return categoryIds;
  }






// Funksjon 1: Henting og spørring av data
async fetchCardDataById(cardId) {
  // Cache key for this card
  const cacheKey = `card_${cardId}`;
  
  // Check if we have this card cached
  if (this.cache[cacheKey]) {
    console.log("Retrieving card from cache:", this.cache[cacheKey]);
    return this.cache[cacheKey];
  }

  const cypher = `
    MATCH (k:Kategori {kategori_id: $cardId})
    MATCH (k)-[:Inneholder]->(s:Spørsmål)
    MATCH (s)-[:Inneholder]->(a:Alternativ)

    RETURN 
    k.kategori_id AS id,
    k.kategori AS kategori_tekst,
    k.kategori_beskrivelse AS kategori_beskrivelse,
    s.sporsmal AS sporsmal_tekst,
    a.alternativ_tekst AS alternativ_tekst,
    a.alternativ_beskrivelse AS alternativ_beskrivelse,
    a.hva_skal_implementeres AS alternativ_hva,
    a.hvordan_implementere AS alternativ_hvordan
  `;

  const records = await this.executeCypher(cypher, { cardId }, cacheKey);
  
  if (records.length === 0) {
    console.log("No cards found for ID:", cardId);
    return null;
  }
  
  return records;
}

// Funksjon 2: Strukturering av data


// Den opprinnelige funksjonen som nå kaller de to nye funksjonene
async getCardById(cardId) {
  // Hent data fra databasen eller cache
  const records = await this.fetchCardDataById(cardId);
  
  // Hvis ingen resultater, returner null
  if (records === null) {
    return null;
  }
  
  return records;
}

















  // Oppdater kortstatus (avhuket/ikke_avhuket)
  async updateCardState(cardId, state) {
    // Ved oppdatering må vi fjerne cachen for dette kortet
    const cacheKey = `card_${cardId}`;
    if (this.cache[cacheKey]) {
      delete this.cache[cacheKey];
    }
    
    const cypher = `
      MATCH (k:Kort {kort_id: $cardId})
      SET k.state = $state
      RETURN k.kort_id AS id, k.state AS state
    `;
    
    const records = await this.executeCypher(cypher, { cardId, state });
    return records[0].toObject();
  }

  // Hent alle kort med caching
  async getAllCards() {
    // Hvis vi allerede har fetched, returner cached data
    if (this.cache.cards) {
      console.log("Returning cached cards");
      return this.cache.cards;
    }

    const cypher = `
      MATCH (k:Kort)
      RETURN k.kort_id AS id
    `;
    
    const records = await this.executeCypher(cypher, {}, 'cards');
    const cardIds = records.map(record => record.get('id'));
    
    // Cache resultatet
    this.cache.cards = cardIds;
    
    return cardIds;
  }
  
  // Beregn brukerpoeng - ikke cache denne da den kan endre seg
  async calculateUserPoints() {
    const cypher = `
      MATCH (k:Kort)
      WHERE k.state = 'avhuket'
      RETURN SUM(k.poeng) + SUM(COALESCE(k.alternativ_poeng, 0)) AS totalPoints
    `;
    
    const records = await this.executeCypher(cypher);
    return records[0].get('totalPoints') || 0;
  }
  
  // Metode for å tømme cache
  clearCache() {
    this.cache = {
      categoryIds: null,
      cards: null
    };
    console.log("Cache cleared");
  }
}

export default DBQueries;