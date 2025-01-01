#構想

## 概要

`json-server`/`zod`/`react-hook-form`
これらを使って簡単なアプリケーションをアプリケーションを爆速で構築できるようにするためのプロジェクト

## 作成の経緯

- json-server の手軽さ、RHC と zod を組み合わせることでフロント/バック感の疎通を素早く構築できてとても快適であった
  学内でのネットワーク上の問題や個人間の環境の差異などで、作ったアプリがうまく動作しない問題があった
- local で、かつ 1 つのサーバー内で全てを完結させ、爆速でプリケーションを作成し学内の課題やアプリのモックアップなどをローコードで作れるようにしておきたいと感じた

## アプリのフロー

- json-server で利用するための json ファイルを UI 上から方安全な状態で生成
- json-server の起動
- json に応じた zod スキーマも生成
- json-server で利用する API のレスポンスやリクエスト body、リクエスト param などの zod スキーマもあらかじめ生成
- 上記の zod スキーマを使用した react-hook-form のコンポーネントもあらかじめ生成
- admin 用の管理テーブル/CRUD フォームの作成

## スコープ外

- json-server がサポートしていない機能全般
  - マイグレーション機能
  - server 側での型安全性の担保...etc
- コンポーネントのスタイリング

## 決まっていないこと

- json-server で画像を扱うロジックが未実装
  - UI 上で画像を入れてそれらをファイルパスとして保存できたらよさそう