import os
from flask import Flask, request, jsonify
from dotenv import load_dotenv
import logging

load_dotenv()

app = Flask(__name__)
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# AI プロバイダー設定
AI_PROVIDER = os.getenv('AI_PROVIDER', 'openai')  # 'openai' or 'gemini'

try:
    if AI_PROVIDER == 'openai':
        import openai
        openai.api_key = os.getenv('OPENAI_API_KEY')
    elif AI_PROVIDER == 'gemini':
        import google.generativeai as genai
        genai.configure(api_key=os.getenv('GEMINI_API_KEY'))
except Exception as e:
    logger.warning(f"AI API 初期化エラー: {e}")


@app.route('/health', methods=['GET'])
def health():
    """ヘルスチェック"""
    return jsonify({'status': 'ok', 'service': 'ai-service'}), 200


@app.route('/chat', methods=['POST'])
def chat():
    """AI との会話エンドポイント"""
    try:
        data = request.get_json()
        user_id = data.get('userId', 'anonymous')
        message = data.get('message', '')

        if not message:
            return jsonify({'error': 'メッセージが空です'}), 400

        logger.info(f"User {user_id}: {message}")

        # AI レスポンス生成
        ai_response = generate_ai_response(message)

        # 感情分析（簡易版）
        sentiment = analyze_sentiment(message)

        return jsonify({
            'response': ai_response,
            'sentiment': sentiment,
            'user_id': user_id,
            'timestamp': str(__import__('datetime').datetime.now())
        }), 200

    except Exception as e:
        logger.error(f"チャットエラー: {e}")
        return jsonify({
            'error': 'AI サービスでエラーが発生しました',
            'message': str(e)
        }), 500


def generate_ai_response(user_message):
    """AI レスポンス生成"""
    try:
        # シスム的な心理サポートプロンプト
        system_prompt = """あなたは行方不明者をサポートする心理カウンセラーのAIアシスタントです。
以下の特徴を持ってください：
- 共感的で優しい対応
- 不安を和らげるような言葉遣い
- 具体的で実用的なアドバイス
- 希望を持たせるような返答
- 短く、分かりやすい日本語で返答
- 必要な場合は、警察や家族への連絡を勧める"""

        if AI_PROVIDER == 'openai':
            response = openai.ChatCompletion.create(
                model="gpt-3.5-turbo",
                messages=[
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": user_message}
                ],
                temperature=0.7,
                max_tokens=300
            )
            return response.choices[0].message.content.strip()
        
        elif AI_PROVIDER == 'gemini':
            import google.generativeai as genai
            model = genai.GenerativeModel('gemini-pro')
            response = model.generate_content(f"{system_prompt}\n\nユーザー: {user_message}")
            return response.text.strip()
        
        else:
            # フォールバック: ダミーレスポンス
            return "心配なことがあるんですね。まずは落ち着いて、深呼吸してみてください。" + \
                   "あなたは一人ではありません。家族や警察に連絡することも大切です。"

    except Exception as e:
        logger.error(f"AI レスポンス生成エラー: {e}")
        return "申し訳ございません。今は話し掛けることができません。" + \
               "少し時間をおいてからもう一度試してください。"


def analyze_sentiment(text):
    """感情分析（簡易版）"""
    try:
        negative_words = ['不安', '怖い', '絶望', '辛い', '苦しい', '助けて']
        positive_words = ['大丈夫', '希望', '安心', '感謝', '嬉しい']

        negative_count = sum(1 for word in negative_words if word in text)
        positive_count = sum(1 for word in positive_words if word in text)

        if negative_count > positive_count:
            return 'negative'
        elif positive_count > negative_count:
            return 'positive'
        else:
            return 'neutral'

    except Exception as e:
        logger.error(f"感情分析エラー: {e}")
        return 'neutral'


@app.route('/meditation', methods=['GET'])
def meditation():
    """瞑想ガイド"""
    try:
        level = request.args.get('level', 'easy')
        
        meditations = {
            'easy': {
                'title': '5分間の呼吸瞑想',
                'duration': 300,
                'steps': [
                    '快適な場所に座ります',
                    'ゆっくり鼻から吸って、口からゆっくり吐きます',
                    'これを5分間繰り返します',
                    'リラックスして、心を落ち着けてください'
                ]
            },
            'medium': {
                'title': '15分間のマインドフルネス瞑想',
                'duration': 900,
                'steps': [
                    '瞑想を始める前に、5分間深呼吸をします',
                    'あなたの感覚に注意を向けます',
                    '思考が浮かんでも、判断せず流します',
                    'ゆっくり瞑想を終わります'
                ]
            }
        }
        
        return jsonify(meditations.get(level, meditations['easy'])), 200

    except Exception as e:
        logger.error(f"瞑想ガイドエラー: {e}")
        return jsonify({'error': str(e)}), 500


if __name__ == '__main__':
    port = int(os.getenv('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=os.getenv('DEBUG', False))
