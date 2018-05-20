export function makeBmobConfig(bql, values) {
  const headers = {};
  headers['X-Bmob-Application-Id'] = '478f1a72c824be4d04f37b08b499df1b';
  headers['X-Bmob-REST-API-Key'] = '2110835c3f939b949df3d1138a4e49c7';
  headers['Content-Type'] = 'application/json';
  const url = `http://api.bmob.cn/1/cloudQuery?bql=${bql}&values=[${values}]`;
  return { url, headers };
}

export function log() {
}
