# 課題2(アプリケーションエンジニアBootcamp)　

#### 課題2URL : https://appkadai2-mnhr82v39-gakutos-projects.vercel.app

- ## 求人検索画面
<img width="998" alt="image" src="https://github.com/user-attachments/assets/16265f81-99eb-4750-8536-5837c00926c6">


- ## 求人投稿画面
<img width="1001" alt="image" src="https://github.com/user-attachments/assets/97da9d89-31cb-4cc3-b042-ede950316672">


# 使用技術について
## nodeバージョン
- node v22.7.0
- npm v10.8.2

## フロント
- [React](https://reactjs.org/) 18.3.1
- [TypeScript](https://www.typescriptlang.org/) 5.5.3
- [Vite](https://vitejs.dev/) 5.4.1
- [Tailwind CSS](https://tailwindcss.com/) 3.4.10

## バックエンド
- [Ruby](https://www.ruby-lang.org/en/) 3.2.2
- [Rails](https://rubyonrails.org/) 7.2.1
- [PostgreSQL](https://www.postgresql.org/) 14

## ホスティング
- フロントエンド: [Vercel](https://vercel.com/)
- バックエンド: [Heroku](https://www.heroku.com/)

# 機能一覧
- 求人の一覧表示
- 求人職種のカテゴリフィルタリング
- 年収額によるフィルタリング
- 新規求人情報の投稿
  - 右上の求人投稿ボタンを押すと、求人投稿ができる画面に遷移します。
  - 求人タイトル、カテゴリ、年収(万円)を入力し投稿ボタンを押せば、求人一覧画面に移動し投稿内容を確認できます。

# 動作手順

app_kadai2ファイルをクローンしてきてください。
Dockerを起動すると、以下のようなエラーが出る可能性があります。
```
Error: Cannot find module @rollup/rollup-linux-arm64-gnu.
```
その場合、下記のコマンドでフロントエンドのコンテナに依存関係をインストールしてください。
```
docker-compose run --rm frontend yarn install
docker-compose up --build
```
