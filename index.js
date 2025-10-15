// 🔁 Auto reload for development
try {
  require('electron-reload')(__dirname, {
    electron: require(`${__dirname}/../node_modules/electron`)
  });
} catch (err) {
  console.log('Auto-reload not enabled:', err);
}

// ⚙️ Core imports
const { app, BrowserWindow } = require('electron');
const path = require('node:path');

// 🧩 Handle installer behavior on Windows
if (require('electron-squirrel-startup')) {
  app.quit();
}

// 🪟 Create the main application window
const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nativeWindowOpen: true, // ✅ allows window.open to create new BrowserWindows
    },
  });

  mainWindow.loadFile(path.join(__dirname, 'index.html'));

  // Uncomment this if you want the DevTools to open by default
  // mainWindow.webContents.openDevTools();
};

// 🚀 When Electron is ready, create the window
app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    // On macOS, recreate window when dock icon is clicked
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// ❌ Quit app when a
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});