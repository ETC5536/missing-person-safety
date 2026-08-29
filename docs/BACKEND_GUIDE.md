# バックエンド開発ガイド

バックエンドの開発・保守に関する情報です。

## ディレクトリ構成

```
backend/
├── src/
│   ├── index.js              # メインサーバーファイル
│   ├── routes/               # ルートハンドラー
│   │   ├── ai.js             # AI チャット関連
│   │   ├── location.js       # GPS・位置情報関連
│   │   └── utilities.js      # 実用情報関連
│   ├── middleware/           # ミドルウェア
│   ├── models/               # データモデル
│   ├── services/             # ビジネスロジック
│   └── utils/                # ユーティリティ関数
├── tests/                    # テストファイル
├── package.json
├── Dockerfile
└── .env.example
```

## 環境構築

### 前提条件
- Node.js 16+
- npm または yarn

### インストール

```bash
cd backend
npm install
```

### 開発サーバーの起動

```bash
npm run dev
```

サーバーは `http://localhost:3000` で起動します。

## API ルートの追加

新しいルートを追加する場合：

### 1. ルートファイルを作成

`src/routes/new-feature.js`:
```javascript
const express = require('express');
const router = express.Router();

// GET エンドポイント
router.get('/example', (req, res) => {
  res.json({ message: 'Success' });
});

// POST エンドポイント
router.post('/example', (req, res) => {
  const { data } = req.body;
  res.status(201).json({ message: 'Created', data });
});

module.exports = router;
```

### 2. index.js で登録

```javascript
const newFeatureRoutes = require('./routes/new-feature');
app.use('/api/new-feature', newFeatureRoutes);
```

## ミドルウェア

共通のミドルウェアを使用する場合：

```javascript
// 認証ミドルウェア（実装予定）
app.use('/api/protected', authenticateToken);

// ロギングミドルウェア
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});
```

## エラーハンドリング

エラーレスポンスの統一フォーマット：

```javascript
try {
  // 処理
} catch (error) {
  console.error(error);
  res.status(500).json({
    error: 'エラーメッセージ',
    message: error.message
  });
}
```

## テスト

テストを実行するには：

```bash
npm test
```

テストファイルの例：

```javascript
// tests/api.test.js
const request = require('supertest');
const app = require('../src/index');

describe('AI API', () => {
  test('POST /api/ai/chat should return response', async () => {
    const res = await request(app)
      .post('/api/ai/chat')
      .send({ userId: 'test', message: 'Hello' });
    
    expect(res.status).toBe(200);
    expect(res.body.message).toBeDefined();
  });
});
```

## WebSocket イベント

リアルタイム通信のイベントハンドリング：

```javascript
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  // イベント受信
  socket.on('custom-event', (data) => {
    console.log('Received:', data);
    // 全員に配信
    io.emit('event-response', data);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});
```

## 環境変数

`.env` ファイルで設定：

```env
NODE_ENV=development
PORT=3000
DATABASE_URL=postgresql://user:password@localhost:5432/db_name
REDIS_URL=redis://localhost:6379
JWT_SECRET=your_secret_key
AI_SERVICE_URL=http://localhost:5000
```

## ログレベル

```javascript
// エラー
console.error('エラーメッセージ:', error);

// 警告
console.warn('警告メッセージ');

// 情報
console.log('情報メッセージ');

// デバッグ
console.debug('デバッグ情報');
```

## デバッグ

Node.js デバッグモード：

```bash
node --inspect src/index.js
```

Chrome DevTools で接続:
- `chrome://inspect` にアクセス

## パフォーマンス最適化

### キャッシング

```javascript
const cache = {};

router.get('/data', (req, res) => {
  if (cache.data) {
    return res.json(cache.data);
  }
  // 処理
  cache.data = result;
  res.json(result);
});
```

### 非同期処理

```javascript
// 順序が重要な場合
async function processSequential() {
  const result1 = await func1();
  const result2 = await func2(result1);
  return result2;
}

// 順序が不要な場合
async function processParallel() {
  const [result1, result2] = await Promise.all([
    func1(),
    func2()
  ]);
  return [result1, result2];
}
```

## セキュリティ

### 入力検証

```javascript
router.post('/data', (req, res) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({ error: '必須フィールドがありません' });
  }
  
  if (!email.includes('@')) {
    return res.status(400).json({ error: '無効なメールアドレス' });
  }
  
  // 処理
});
```

### SQL インジェクション対策

PostgreSQL パラメータ化クエリ使用：

```javascript
const query = 'SELECT * FROM users WHERE id = $1';
const result = await db.query(query, [userId]);
```

## トラブルシューティング

### ポート競合

```bash
# ポート 3000 を使用しているプロセスを確認
lsof -i :3000

# プロセスを終了
kill -9 <PID>
```

### データベース接続エラー

```bash
# PostgreSQL が起動しているか確認
pg_isready -h localhost -p 5432
```

### メモリリーク

```bash
# Node プロセスのメモリ使用量を監視
node --max-old-space-size=2048 src/index.js
```

---

詳細は [CONTRIBUTING.md](../CONTRIBUTING.md) をご覧ください。
