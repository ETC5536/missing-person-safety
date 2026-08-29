require('dotenv').config();
const express = require('express');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');

// ルートのインポート
const aiRoutes = require('./routes/ai');
const locationRoutes = require('./routes/location');
const utilitiesRoutes = require('./routes/utilities');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: process.env.REACT_APP_API_URL || 'http://localhost:3001',
    credentials: true
  }
});

// ミドルウェア
app.use(cors());
app.use(express.json());

// ヘルスチェック
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date() });
});

// API ルート
app.use('/api/ai', aiRoutes);
app.use('/api/location', locationRoutes);
app.use('/api/utilities', utilitiesRoutes);

// WebSocket 接続 (リアルタイム通知)
io.on('connection', (socket) => {
  console.log('ユーザー接続:', socket.id);

  // 位置情報の更新通知
  socket.on('location-update', (data) => {
    console.log('位置情報更新:', data);
    io.emit('user-location', data);
  });

  // SOS 緊急通知
  socket.on('sos-alert', (data) => {
    console.log('SOS 通知:', data);
    io.emit('emergency-alert', {
      userId: data.userId,
      location: data.location,
      message: data.message,
      timestamp: new Date()
    });
  });

  // コミュニティメッセージ
  socket.on('community-message', (data) => {
    console.log('コミュニティメッセージ:', data);
    io.emit('new-community-message', {
      userId: data.userId,
      message: data.message,
      timestamp: new Date()
    });
  });

  socket.on('disconnect', () => {
    console.log('ユーザー切断:', socket.id);
  });
});

// エラーハンドリング
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'サーバーエラーが発生しました',
    message: err.message
  });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`🚀 バックエンドサーバーが起動しました: http://localhost:${PORT}`);
  console.log(`🔍 ヘルスチェック: http://localhost:${PORT}/health`);
});
