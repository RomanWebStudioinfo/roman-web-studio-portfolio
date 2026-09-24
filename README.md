# Roman Web Studio Portfolio

GitHub + Cloudflare Pages でそのまま公開できる静的サイトです。

## Cloudflare Pagesへの公開

1. このフォルダの中身をGitHubリポジトリへアップロードします。
2. Cloudflareの「Workers & Pages」から「Create application」→「Pages」→「Connect to Git」を選びます。
3. GitHubリポジトリを選択します。
4. Framework presetは「None」、Build commandは `exit 0`、Build output directoryは `.` にします。
5. 「Save and Deploy」で公開します。

## 更新方法

- 本文: `index.html`
- 色やレイアウト: `styles.css`
- メニューや表示アニメーション: `script.js`
- 画像: `assets/`

GitHub上のファイルを更新すると、Cloudflare Pagesへ自動で再公開されます。
