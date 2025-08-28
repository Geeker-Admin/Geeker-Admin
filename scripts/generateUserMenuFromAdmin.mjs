import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

import adminMenu from './admin-menu.json' with { type: 'json' }

// ESM 中没有 __dirname，这里自行计算当前文件目录
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const adminMenuData = Array.isArray(adminMenu) ? adminMenu : (adminMenu?.data ?? [])
const userMenu = adminMenuData.filter(item => !['/auth', '/system'].includes(item.path))

// 如果有 user-menu.json 则删除
if (fs.existsSync(path.resolve(__dirname, './user-menu.json'))) {
  fs.unlinkSync(path.resolve(__dirname, './user-menu.json'))
}
// 写入 user-menu.json
fs.writeFileSync(path.resolve(__dirname, './user-menu.json'), JSON.stringify(userMenu, null, 2))
// eslint-disable-next-line no-console
console.log('写入 user-menu.json 成功')
