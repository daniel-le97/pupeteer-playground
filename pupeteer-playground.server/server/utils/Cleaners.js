// cleans urls
export function cleanUrl(str){
  let staged = str.split('://')[1].split('.')
  return staged[0] + '.' + staged[1]
}
export function urlCheck(str =''){
  let out = str.startsWith('https://',0)
  return out ? str : 'https://'+ str
}
export function cleanPath(str=''){
  let out = ''
  if(!str.endsWith('/')) out += '/'
  return out
}

export function hexCode(dict){
  let hexes ={}
  for(let key in dict){
    let value = dict[key]
    let a;
    let isPercent;
    let rgb = key.replace(/\s/g, '').match(/^rgba?\((\d+),(\d+),(\d+),?([^,\s)]+)?/i),
    alpha = (rgb && rgb[4] || "").trim(),
    hex = rgb ?
    (+rgb[1] | 1 << 8).toString(16).slice(1) +
    (+rgb[2] | 1 << 8).toString(16).slice(1) +
    (+rgb[3] | 1 << 8).toString(16).slice(1) : key;

  if (alpha !== "") {
    a = alpha;
  } else {
    a = '01';
  }
  // multiply before convert to HEX
  a = ((+a * 255) | 1 << 8).toString(16).slice(1)
  hex = '#'+hex + a;
  if (hex.length == 7 || hex.length == 9){
    hexes[hex] = value;
  }
  }
  return hexes;
}

export function calculatePercent(dict = {}){
  let total = 0
  let ignores = ['rgb(255, 255, 255)', 'rgb(0, 0, 0)','rgba(0, 0, 0, 0)', '#ffffffff', '#000000ff', '#00000000' ]
  for (const key in dict) {
    if(!ignores.includes(key)){
      total += dict[key];
    }
  }
  for (const key in dict){
    if(!ignores.includes(key)){
    dict[key] = ((dict[key]/total)*100).toFixed(2)
    } else{
      dict[key]= '0'
    }
  }
  return dict
}
