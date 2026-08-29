# API ドキュメント

行方不明者安心アプリの API リファレンスです。

## 基本情報

- **ベースURL**: `http://localhost:3000/api`
- **Content-Type**: `application/json`
- **認証**: JWT Bearer Token（将来実装予定）

---

## 🤖 AI チャット API

### チャットメッセージ送信

**エンドポイント**
```
POST /ai/chat
```

**リクエスト**
```json
{
  "userId": "user_123",
  "message": "助けてください、迷子になりました"
}
```

**レスポンス (200 OK)**
```json
{
  "message": "大丈夫です。落ち着いてください。...",
  "sentiment": "negative",
  "timestamp": "2024-01-15T10:30:00Z"
}
```

**エラー (400 Bad Request)**
```json
{
  "error": "メッセージは必須です"
}
```

### 瞑想ガイド取得

**エンドポイント**
```
GET /ai/meditation/:level
```

**パラメータ**
- `level`: `easy` | `medium` | `hard`

**レスポンス (200 OK)**
```json
{
  "title": "5分間の呼吸瞑想",
  "duration": 300,
  "description": "深呼吸による初心者向けリラックス",
  "audioUrl": "/audio/meditation-easy.mp3"
}
```

### 感情ログ記録

**エンドポイント**
```
POST /ai/emotion-log
```

**リクエスト**
```json
{
  "userId": "user_123",
  "emotion": "不安",
  "intensity": 7,
  "note": "迷子になって心配です"
}
```

**レスポンス (201 Created)**
```json
{
  "message": "感情ログを記録しました",
  "logId": "log_1705315800000",
  "emotion": "不安",
  "intensity": 7,
  "timestamp": "2024-01-15T10:30:00Z"
}
```

---

## 📍 位置情報 API

### 位置情報更新

**エンドポイント**
```
POST /location/update
```

**リクエスト**
```json
{
  "userId": "user_123",
  "latitude": 35.6762,
  "longitude": 139.6503,
  "accuracy": 5
}
```

**レスポンス (200 OK)**
```json
{
  "message": "位置情報を更新しました",
  "location": {
    "latitude": 35.6762,
    "longitude": 139.6503,
    "accuracy": 5
  },
  "timestamp": "2024-01-15T10:30:00Z"
}
```

### 位置情報を家族と共有

**エンドポイント**
```
POST /location/share
```

**リクエスト**
```json
{
  "userId": "user_123",
  "familyIds": ["family_001", "family_002"]
}
```

**レスポンス (200 OK)**
```json
{
  "message": "位置情報を家族と共有しました",
  "sharedWith": ["family_001", "family_002"],
  "timestamp": "2024-01-15T10:30:00Z"
}
```

### 周辺施設検索

**エンドポイント**
```
GET /location/nearby-facilities
```

**クエリパラメータ**
```
?latitude=35.6762&longitude=139.6503&type=police
```

- `latitude`: 緯度（必須）
- `longitude`: 経度（必須）
- `type`: `police` | `hospital` | `shelter` | 省略で全て

**レスポンス (200 OK)**
```json
[
  {
    "id": "police_001",
    "name": "〇〇警察署",
    "type": "警察署",
    "distance": 0.5,
    "latitude": 35.6762,
    "longitude": 139.6503,
    "phone": "110",
    "hours": "24時間"
  }
]
```

### SOS 緊急通知送信

**エンドポイント**
```
POST /location/sos/send
```

**リクエスト**
```json
{
  "userId": "user_123",
  "latitude": 35.6762,
  "longitude": 139.6503,
  "message": "助けてください。行方不明です。"
}
```

**レスポンス (201 Created)**
```json
{
  "message": "SOS通知を送信しました",
  "sosId": "sos_1705315800000",
  "recipients": ["family", "police"],
  "location": {
    "latitude": 35.6762,
    "longitude": 139.6503
  },
  "timestamp": "2024-01-15T10:30:00Z"
}
```

---

## 🛠️ 実用情報 API

### 食事・水を検索

**エンドポイント**
```
GET /utilities/food-water
```

**クエリパラメータ**
```
?latitude=35.6762&longitude=139.6503&radius=1000
```

- `latitude`: 緯度（必須）
- `longitude`: 経度（必須）
- `radius`: 検索半径（メートル、デフォルト 1000）

**レスポンス (200 OK)**
```json
[
  {
    "id": "food_001",
    "name": "コンビニエンスストア A",
    "type": "convenience_store",
    "distance": 0.3,
    "address": "〇〇町1丁目",
    "phone": "03-xxxx-xxxx",
    "hours": "24時間営業",
    "items": ["food", "water", "medicine"]
  }
]
```

### 交通手段を検索

**エンドポイント**
```
GET /utilities/transportation
```

**クエリパラメータ**
```
?startLat=35.6762&startLon=139.6503&endLat=35.7000&endLon=139.7000
```

**レスポンス (200 OK)**
```json
[
  {
    "id": "route_001",
    "type": "public_transit",
    "name": "電車",
    "duration": "30分",
    "cost": 200,
    "steps": [
      {
        "type": "徒歩",
        "duration": "5分",
        "description": "駅まで歩く"
      },
      {
        "type": "電車",
        "duration": "25分",
        "description": "〇〇線で移動"
      }
    ]
  }
]
```

### 防災・天気情報取得

**エンドポイント**
```
GET /utilities/weather-alert
```

**クエリパラメータ**
```
?latitude=35.6762&longitude=139.6503
```

**レスポンス (200 OK)**
```json
{
  "weather": {
    "current": "曇り",
    "temperature": 25,
    "humidity": 60,
    "windSpeed": 3
  },
  "alerts": [
    {
      "type": "warning",
      "message": "〇〇地域に雷警報が発令されています",
      "level": "high",
      "action": "屋内に避難してください"
    }
  ]
}
```

### 多言語翻訳

**エンドポイント**
```
POST /utilities/translate
```

**リクエスト**
```json
{
  "text": "I am lost and need help",
  "targetLanguage": "ja"
}
```

**レスポンス (200 OK)**
```json
{
  "original": "I am lost and need help",
  "targetLanguage": "ja",
  "translated": "私は迷子になり、助けが必要です"
}
```

---

## エラーレスポンス

### 400 Bad Request
```json
{
  "error": "バリデーションエラー",
  "details": "required field missing"
}
```

### 500 Internal Server Error
```json
{
  "error": "サーバーエラーが発生しました",
  "message": "AI サービスが利用できません"
}
```

---

## ステータスコード

| コード | 説明 |
|--------|------|
| 200 | OK - リクエスト成功 |
| 201 | Created - リソース作成成功 |
| 400 | Bad Request - 不正なリクエスト |
| 401 | Unauthorized - 認証が必要 |
| 404 | Not Found - リソースが見つからない |
| 500 | Internal Server Error - サーバーエラー |

---

## レート制限

- **制限**: 1 分間に 60 リクエスト
- **ヘッダー**: `X-RateLimit-Remaining`

---

## WebSocket イベント

リアルタイム通知用の WebSocket コネクション

### 接続

```javascript
const socket = io('http://localhost:3000');

socket.on('connect', () => {
  console.log('接続しました');
});
```

### イベント

**位置情報更新**
```javascript
socket.emit('location-update', {
  userId: 'user_123',
  latitude: 35.6762,
  longitude: 139.6503
});
```

**SOS 緊急通知**
```javascript
socket.emit('sos-alert', {
  userId: 'user_123',
  location: { latitude: 35.6762, longitude: 139.6503 },
  message: '助けてください'
});
```

**コミュニティメッセージ**
```javascript
socket.emit('community-message', {
  userId: 'user_123',
  message: '〇〇駅の近くに安全な場所があります'
});
```

### リッスン

```javascript
socket.on('emergency-alert', (data) => {
  console.log('緊急通知:', data);
});

socket.on('user-location', (data) => {
  console.log('位置情報更新:', data);
});

socket.on('new-community-message', (data) => {
  console.log('コミュニティメッセージ:', data);
});
```

---

更新日: 2024-01-15
