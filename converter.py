import os

# Specify the directory where your files are located
directory = "./"

# Loop through files in the directory
for filename in os.listdir(directory):
    # Check if the file is a .js, .html, .css, or .json file
    if filename.endswith((".js", ".html", ".css", ".json")):
        # Extract the original extension
        _, original_extension = os.path.splitext(filename)
        print(original_extension)
        
        # Define the new extension as .txt
        new_extension = ".txt"
        
        # Create the new file name with original extension and .txt extension
        new_filename = filename.replace(original_extension, f"{original_extension}{new_extension}")
        
        # Read the content of the source file
        with open(filename, 'r') as source_file:
            content = source_file.read()
        
        # Write the content to a new .txt file in the 'text_files' folder
        with open(os.path.join('text_files', new_filename), 'w') as txt_file:
            txt_file.write(content)

print("Conversion completed.")
