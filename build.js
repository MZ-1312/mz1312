const fs = require('fs');
const path = require('path');

// Function to recursively copy directory
function copyDir(src, dest) {
    // Create destination directory if it doesn't exist
    if (!fs.existsSync(dest)) {
        fs.mkdirSync(dest, { recursive: true });
    }

    // Read the source directory
    const entries = fs.readdirSync(src, { withFileTypes: true });

    for (const entry of entries) {
        const srcPath = path.join(src, entry.name);
        const destPath = path.join(dest, entry.name);

        if (entry.isDirectory()) {
            // Recursively copy subdirectories
            copyDir(srcPath, destPath);
        } else {
            // Copy files
            fs.copyFileSync(srcPath, destPath);
        }
    }
}

// Build process
console.log('Starting build process...');

// Clean build directory
const buildDir = path.join(__dirname, 'build');
if (fs.existsSync(buildDir)) {
    fs.rmSync(buildDir, { recursive: true });
}

// Copy source files to build directory
const srcDir = path.join(__dirname, 'src');
copyDir(srcDir, buildDir);

console.log('Build completed successfully!');
console.log(`Files copied from '${srcDir}' to '${buildDir}'`);