# 🆘 行方不明者安心アプリ

> **AIがいつも一緒。安心できる場所を探そう。**

行方不明になってしまった人が、安心して過ごせるようにサポートするアプリケーションです。

## 🎯 プロジェクト概要

このアプリは、行方不明者に以下の機能を提供します：

- 🤖 **AI 心理サポート**: 24時間AI が不安や悩みに寄り添う
- 📍 **GPS 位置追跡**: リアルタイムで家族と位置情報を共有
- 🆘 **SOS 緊急通知**: ワンタップで家族と警察に連絡
- 🍽️ **実用情報**: 食事・交通・防災情報をすぐに検索
- 🌍 **多言語対応**: 言葉の心配なし
- 👥 **コミュニティ**: 同じ状況の人と安全に繋がる

## 🚀 クイックスタート

### 前提条件

- Docker & Docker Compose
- または Node.js 16+, Python 3.11+

### Docker で起動（推奨）

```bash
# リポジトリをクローン
git clone https://github.com/ETC5536/missing-person-safety.git
cd missing-person-safety

# 環境変数を設定
cp .env.example .env

# サービスを起動
docker-compose up -d

# ブラウザで開く
open http://localhost:3001
```

### ローカル開発

```bash
# バックエンド
cd backend
npm install
npm run dev

# フロントエンド（別ターミナル）
cd frontend
npm install
npm start

# AI サービス（別ターミナル）
cd ai-service
pip install -r requirements.txt
python app.py
```

詳細は [QUICKSTART.md](docs/QUICKSTART.md) をご覧ください。

## 📊 プロジェクト構成

```
missing-person-safety/
├── backend/              # Node.js/Express API
├── frontend/             # React UI
├── ai-service/           # Python/Flask AI
├── docs/                 # ドキュメント
└── docker-compose.yml    # マルチサービス管理
```

## 🏗️ アーキテクチャ

```
┌─────────────────┐
│   React UI      │
│  (Port 3001)    │
└────────┬────────┘
         │
┌────────▼────────────────────────────┐
│    Express.js API (Port 3000)       │
├─────────────────────────────────────┤
│ • AI チャット                        │
│ • GPS・位置情報                      │
│ • 実用情報                           │
│ • WebSocket リアルタイム通知         │
└────────┬──────────────┬──────────────┘
         │              │
    ┌────▼──┐      ┌────▼──────────┐
    │ Python│      │  PostgreSQL   │
    │ Flask │      │  + Redis      │
    │AI Svc │      │  (データ)      │
    │       │      │               │
    └───────┘      └────────────────┘
```

詳細は [ARCHITECTURE.md](docs/ARCHITECTURE.md) をご覧ください。

## 📚 ドキュメント

| ドキュメント | 説明 |
|-----------|------|
| [QUICKSTART.md](docs/QUICKSTART.md) | セットアップガイド |
| [ARCHITECTURE.md](docs/ARCHITECTURE.md) | システム設計 |
| [API.md](docs/API.md) | API リファレンス |
| [BACKEND_GUIDE.md](docs/BACKEND_GUIDE.md) | バックエンド開発ガイド |
| [FRONTEND_GUIDE.md](docs/FRONTEND_GUIDE.md) | フロントエンド開発ガイド |
| [ROADMAP.md](docs/ROADMAP.md) | 開発ロードマップ |
| [PROJECT_SUMMARY.md](docs/PROJECT_SUMMARY.md) | プロジェクト総括 |

## 🛠️ 技術スタック

### フロントエンド
- React 18
- React Router 6
- Tailwind CSS 3
- Axios
- Socket.io Client

### バックエンド
- Node.js 18
- Express.js 4
- PostgreSQL 15
- Redis 7
- Socket.io

### AI サービス
- Python 3.11
- Flask 3
- OpenAI / Google Generative AI

## 📋 実装済み機能

### ✅ バージョン 1.0 (MVP)

**バックエンド API**
- [x] AI チャット API
- [x] GPS 位置情報 API
- [x] SOS 緊急通知 API
- [x] 周辺施設検索
- [x] 食事・水検索
- [x] 交通手段検索
- [x] 天気・防災情報
- [x] 多言語翻訳
- [x] WebSocket リアルタイム通知

**フロントエンド UI**
- [x] ホーム画面
- [x] AI チャット画面
- [x] GPS 位置情報画面
- [x] 実用情報画面
- [x] レスポンシブデザイン

**AI サービス**
- [x] AI レスポンス生成
- [x] 感情分析
- [x] 瞑想ガイド

### 🔄 計画中

- [ ] ユーザー認証・登録
- [ ] コミュニティ チャット機能
- [ ] iOS/Android アプリ
- [ ] 警察・行政連携
- [ ] 顔認識技術

詳細は [ROADMAP.md](docs/ROADMAP.md) をご覧ください。

## 🧪 テスト

```bash
# バックエンド テスト
cd backend
npm test

# フロントエンド テスト
cd frontend
npm test
```

## 🐛 トラブルシューティング

### ポート競合エラー

```bash
# ポート 3000 を使用しているプロセスを確認・終了
lsof -i :3000
kill -9 <PID>
```

### データベース接続エラー

```bash
# PostgreSQL が起動しているか確認
docker-compose logs postgres

# コンテナを再起動
docker-compose restart postgres
```

### API が応答しない

```bash
# ヘルスチェック
curl http://localhost:3000/health
curl http://localhost:5000/health
```

詳細は [QUICKSTART.md](docs/QUICKSTART.md) をご覧ください。

## 🤝 貢献

このプロジェクトへの貢献をお待ちしています！

### ステップ

1. フォークする
2. フィーチャーブランチを作成 (`git checkout -b feature/amazing-feature`)
3. 変更をコミット (`git commit -m 'Add amazing feature'`)
4. ブランチにプッシュ (`git push origin feature/amazing-feature`)
5. プルリクエストを作成

詳細は [CONTRIBUTING.md](CONTRIBUTING.md) をご覧ください。

## 📞 サポート

- **Issues**: [GitHub Issues](https://github.com/ETC5536/missing-person-safety/issues)
- **Discussions**: [GitHub Discussions](https://github.com/ETC5536/missing-person-safety/discussions)
- **Email**: yumeki.1222.1320@gmail.com

## 📜 ライセンス

このプロジェクトは MIT License の下で公開されています。
詳細は [LICENSE](LICENSE) ファイルをご覧ください。

## 🎯 プロジェクトの目標

| マイルストーン | 目標 | 期間 |
|-------------|------|------|
| MVP リリース | 基本機能完成 | Q1 2024 |
| Beta テスト | ユーザーテスト開始 | Q2 2024 |
| モバイルアプリ | iOS/Android リリース | Q3 2024 |
| 公式リリース | 本番環境移行 | Q4 2024 |

## ❤️ 謝辞

このプロジェクトをサポートしていただいた方々に感謝します。

- GitHub コミュニティ
- OpenAI・Google Generative AI
- すべてのコントリビューター

## 💙 最後に

> **「このアプリで、行方不明者が少しでも安心できる環境を作ります。」**

このプロジェクトは、実際の生命・安全に関わる重要なミッションです。
すべての決定は、ユーザーのニーズと幸福を最優先に行われます。

---

**開発チーム一同より**

🚀 Happy Coding! 💙
