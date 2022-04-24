
export function isInViewPortOfOne(el, pad = 100) {
  const viewPortHeight = window.innerHeight
    || document.documentElement.clientHeight
    || document.body.clientHeight;
  const { offsetTop } = el;
  const { scrollTop } = document.documentElement;
  const top = offsetTop - scrollTop;
  return top <= viewPortHeight + pad;
}

export function download(href, cb) {
  const eleLink = document.createElement('a');
  eleLink.download = '';
  eleLink.href = href;
  eleLink.click();
  eleLink.remove();
  cb && cb();
}

export function downloadByData(url, cb) {
  const image = new Image();
  image.setAttribute('crossOrigin', 'anonymous');
  image.src = url;
  image.onload = () => {
    const canvas = document.createElement('canvas');
    canvas.width = image.width;
    canvas.height = image.height;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(image, 0, 0, image.width, image.height);
    const ext = image.src.substring(image.src.lastIndexOf('.') + 1).toLowerCase();
    const dataURL = canvas.toDataURL(`image/${ext}`);
    download(dataURL, cb);
  };
}

export function downloadByBlob(url, cb) {
  const image = new Image();
  image.setAttribute('crossOrigin', 'anonymous');
  image.src = url;
  image.onload = () => {
    const canvas = document.createElement('canvas');
    canvas.width = image.width;
    canvas.height = image.height;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(image, 0, 0, image.width, image.height);
    canvas.toBlob((blob) => {
      const url = URL.createObjectURL(blob);
      download(url, cb);
      // 用完释放URL对象
      URL.revokeObjectURL(url);
    });
  };
}

export function getClient() {
  return {
    width: document.body.clientWidth || document.documentElement.clientWidth,
    height: document.body.clientHeight || document.documentElement.clientHeight,
  };
}
