import os

def find_typescript_files(directory='.'):
    """Find all TypeScript files in the given directory and its subdirectories."""
    typescript_files = []
    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.endswith('.ts') or file.endswith('.tsx') or file.endswith('.json'):
                typescript_files.append(os.path.join(root, file))
    return sorted(typescript_files)  # Sort filenames for consistent output

def main():
    # Find all TypeScript files
    typescript_files = find_typescript_files()
    
    # Open result.txt for writing
    with open('result.txt', 'w', encoding='utf-8') as result_file:
        for i, ts_file in enumerate(typescript_files):
            # Add a separator between files (except for the first file)
            if i > 0:
                result_file.write('\n\n' + '=' * 80 + '\n\n')
            
            # Write the filename as a header
            result_file.write(f'# {ts_file}\n\n')
            
            # Read and write the content of the file
            try:
                with open(ts_file, 'r', encoding='utf-8') as f:
                    content = f.read()
                    result_file.write(content)
            except Exception as e:
                result_file.write(f'Error reading file: {str(e)}')
        
        # Write summary at the end
        result_file.write(f'\n\n{"-" * 80}\nTotal TypeScript files found: {len(typescript_files)}\n')

if __name__ == '__main__':
    main()