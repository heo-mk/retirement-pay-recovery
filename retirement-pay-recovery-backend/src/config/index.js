'use strict';

require('dotenv').config();

const PORT = process.env.PORT || 5001;
const LAW_API_OC_ID = process.env.LAW_API_OC_ID || '';

// 필수 환경변수 누락 시 경고만 출력하고 서버는 계속 기동
if (!LAW_API_OC_ID) {
  console.warn(
    '[config] 경고: LAW_API_OC_ID 가 설정되지 않았습니다. 법제처 API 연동이 필요한 엔드포인트는 동작하지 않을 수 있습니다.'
  );
}

module.exports = {
  PORT,
  LAW_API_OC_ID,
};
