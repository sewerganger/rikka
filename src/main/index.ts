import { app, BrowserWindow, Menu, Tray, ipcMain, nativeImage } from 'electron';
import { resolve, basename } from 'path';
import { handleUpdate } from './update';

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path')
    .join(__dirname, '/static')
    .replace(/\\/g, '\\\\');
}

let mainWindow: BrowserWindow | null;
let tray: Tray;
const execProgramName = basename(process.execPath);
const updateUrl = process.env.NODE_ENV === 'development' ? 'http://localhost' : 'http://localhost';

const setAutoLogin = (isAuto = false) => {
  app.setLoginItemSettings({
    openAtLogin: isAuto,
    openAsHidden: true,
    path: process.execPath,
    args: ['--processStart', `"${execProgramName}"`]
  });
};

const winURL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:9080/index.html'
    : `file://${__dirname}/index.html`;

function createWindow() {
  mainWindow = new BrowserWindow({
    height: 780,
    width: 1200,
    useContentSize: true,
    frame: false,
    transparent: true,
    webPreferences: {
      nodeIntegration: true,
      webSecurity: false
    }
  });

  Menu.setApplicationMenu(null);

  mainWindow.loadURL(winURL);
  mainWindow.setMinimumSize(1000, 636);

  ipcMain.on('min', () => {
    mainWindow!.minimize();
  });

  ipcMain.on('max', () => {
    mainWindow!.maximize();
  });

  ipcMain.on('close', () => {
    mainWindow!.close();
  });

  ipcMain.on('direct-close', () => {
    mainWindow!.destroy();
  });

  ipcMain.on('openAutoLogin', () => {
    setAutoLogin(true);
  });

  ipcMain.on('closeAutoLogin', () => {
    setAutoLogin(false);
  });

  ipcMain.on('devtool', () => {
    mainWindow!.webContents.openDevTools();
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  mainWindow.on('close', (event: any) => {
    event.preventDefault();
    mainWindow!.hide();
    // 不在任务栏显示
    mainWindow!.setSkipTaskbar(true);
  });

  // 检查自动更新
  handleUpdate(mainWindow, updateUrl);

  const iconPath = resolve(__dirname, '../../static/icons/tray.png');
  const trayIcon = nativeImage.createFromPath(iconPath);
  tray = new Tray(trayIcon);
  tray.setImage(trayIcon);

  const contextMenu = Menu.buildFromTemplate([
    {
      label: '显示',
      click: () => {
        mainWindow!.show();
      }
    },
    {
      label: '退出',
      click: () => {
        mainWindow!.destroy();
      }
    }
  ]);
  tray.setToolTip('邪王真眼最强');
  tray.setContextMenu(contextMenu);

  tray.on('click', () => {
    mainWindow!.isVisible() ? mainWindow!.hide() : mainWindow!.show();
    mainWindow!.isVisible() ? mainWindow!.setSkipTaskbar(false) : mainWindow!.setSkipTaskbar(true);
  });
}

app.on('ready', createWindow);

setAutoLogin(false);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
  tray.destroy();
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
