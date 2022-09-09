### 玩具插件

### 用法
```shell
pnpm add vite-pligin-furion -D
```

```js
import {vitePluginFurion} from 'vite-pligin-furion'
```

```json
plugins:[
  vitePluginFurion()
]
```


在执行pnpm dev --mode [staging] 时，插件会检查是否存在这个staging，如果不存在，则给予一个提示，不影响项目正常执行。  
因为我有几次拼写错误的经历，就做了这个插件来提示自己。