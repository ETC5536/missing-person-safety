# 貢献ガイドライン

このプロジェクトへの貢献をお待ちしています！このドキュメントでは、貢献の方法をご説明します。

## 🎯 貢献の方法

### 報告・提案

**バグ報告や機能提案がある場合:**

1. [Issues](https://github.com/ETC5536/missing-person-safety/issues) をご確認ください
2. 同じ問題が報告されていないかチェック
3. 新しい Issue を作成してください

### コード貢献

#### ステップ 1: フォーク

```bash
# GitHub 上でこのリポジトリをフォーク
```

#### ステップ 2: クローン

```bash
git clone https://github.com/YOUR_USERNAME/missing-person-safety.git
cd missing-person-safety
```

#### ステップ 3: ブランチを作成

```bash
git fetch origin main
git checkout main
git checkout -b feature/your-feature-name
```

**ブランチ命名規則:**
- `feature/` - 新機能
- `fix/` - バグ修正
- `docs/` - ドキュメント
- `refactor/` - コード改善
- `test/` - テスト追加

#### ステップ 4: 変更を実装

```bash
docker-compose up -d
```

#### ステップ 5: テストを実行

```bash
cd backend && npm test
cd frontend && npm test
```

#### ステップ 6: コミット

```bash
git add .
git commit -m "type: brief description"
```

**type の種類:**
- `feat` - 新機能
- `fix` - バグ修正
- `docs` - ドキュメント
- `style` - コード整形
- `refactor` - コード改善
- `test` - テスト追加
- `chore` - ビルド、依存関係など

#### ステップ 7: プッシュ

```bash
git push origin feature/your-feature-name
```

#### ステップ 8: プルリクエスト作成

GitHub で自分のフォークを開き、"Compare & pull request" をクリック

## 📝 コーディング規約

### JavaScript/React

```javascript
// ✅ Good
const handleClick = () => {
  console.log('clicked');
};

// ❌ Bad
const handleclick = () => { console.log('clicked'); };
```

**ルール:**
- 関数名: camelCase
- 定数: UPPER_SNAKE_CASE
- クラス: PascalCase
- インデント: 2 スペース
- セミコロン: 使用する

### Python

```python
# ✅ Good
def get_user_data(user_id):
    """ユーザーデータを取得する"""
    return db.query(User).get(user_id)

# ❌ Bad
def getData(user_id):
    return db.query(User).get(user_id)
```

**ルール:**
- 関数名・変数名: snake_case
- クラス名: PascalCase
- インデント: 4 スペース
- ドキュメント文字列: 使用する

## 🧪 テスト

### テストを書く

```javascript
// tests/api.test.js
const request = require('supertest');
const app = require('../src/index');

describe('AI Chat API', () => {
  test('should return AI response', async () => {
    const res = await request(app)
      .post('/api/ai/chat')
      .send({
        userId: 'test_user',
        message: 'Hello'
      });

    expect(res.status).toBe(200);
    expect(res.body.response).toBeDefined();
  });
});
```

## 🔍 PR レビュー項目

1. **コード品質** - 可読性、保守性
2. **テスト** - テストカバレッジ
3. **セキュリティ** - 入力検証
4. **ドキュメント** - README、コメント
5. **コーディング規約** - ルール準拠

## 🚀 マージ前チェックリスト

- [ ] すべてのテストが成功している
- [ ] コードレビューを受けた
- [ ] ドキュメントを更新した
- [ ] コミットメッセージが適切である
- [ ] コンフリクトがない

## 📋 開発環境セットアップ

```bash
git clone https://github.com/ETC5536/missing-person-safety.git
cd missing-person-safety
cp .env.example .env
docker-compose up -d
```

## 🐛 バグ修正の流れ

1. Issue で問題を報告
2. `fix/issue-description` ブランチを作成
3. テストを書く
4. 修正を実装
5. PR を作成

## ✨ 新機能の提案

1. Issue で提案内容を説明
2. メンテナーからのフィードバックを待つ
3. 承認されたら `feature/` ブランチで実装
4. テストを書く
5. ドキュメントを更新
6. PR を作成

## 📞 コミュニケーション

- **Issues**: [GitHub Issues](https://github.com/ETC5536/missing-person-safety/issues)
- **Discussions**: [GitHub Discussions](https://github.com/ETC5536/missing-person-safety/discussions)

## 🎓 学習リソース

- [Git ガイド](https://git-scm.com/book/ja/v2)
- [GitHub フロー](https://guides.github.com/introduction/flow/)
- [React ドキュメント](https://ja.react.dev/)
- [Express.js ガイド](https://expressjs.com/ja/)

## 💡 貢献時のヒント

1. **小さな PR**: 大きな変更は複数の PR に分ける
2. **テストを書く**: 新機能にはテストを含める
3. **ドキュメント**: 変更に対応するドキュメントを更新
4. **コミット**: 明確で詳細なメッセージを書く
5. **レビュー**: フィードバックを前向きに受け取る

## 🙏 謝辞

貢献してくれてありがとうございます！
皆さんの協力でこのプロジェクトがより良くなります。 💙

---

Happy Contributing! 🚀
