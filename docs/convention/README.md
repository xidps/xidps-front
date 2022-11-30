
### 코딩 컨벤션

- 폴더 이름은 소문자로 시작함
- 모든 타입은 types의 하위 폴더로 지정함
- 구현 하고자 하는 기능의 도메인은 범위를 정하고 한 폴더에 모음

파일 import의 경우 외부 의존성의 경우 맨위로 배치하며 그렇지 않는 경우는 아래쪽으로 배치합니다.
추가로 알파벳 순서로 배치하는 것을 권장합니다.
```typescript
import {ref, watch} from "vue";

import {useAuthStore} from "@/store/auth/useAuthStore";
import AuthLayout from "@/layout/login/AuthLayout.vue";
```
