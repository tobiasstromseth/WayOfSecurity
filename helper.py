import os

def generate_sprite_imports(sprite_path, output_path):
   # Get all SVG files in the directory
   svg_files = [f for f in os.listdir(sprite_path) if f.endswith('.svg')]
   svg_files.sort()
   
   print(f"Found {len(svg_files)} SVG files")
   
   # Create import statements with relative path
   imports = []
   for svg_file in svg_files:
       component_name = os.path.splitext(svg_file)[0]
       import_line = f"import {component_name} from '../../../assets/sprites/{svg_file}';"
       imports.append(import_line)
   
   # Create the file content
   content = """// Sprite imports
{}
""".format('\n'.join(imports))
   
   # Write to file
   with open(output_path, 'w') as f:
       f.write(content)
   
   print(f"Generated imports file at: {output_path}")
   print(f"Total imports generated: {len(svg_files)}")

# Paths
sprite_path = r"C:\Users\pette\Documents\GitHub\WayOfSecurity\src\assets\sprites"
output_path = r"C:\Users\pette\Documents\GitHub\WayOfSecurity\src\components\SpriteImports.js"

generate_sprite_imports(sprite_path, output_path)