import axios from 'axios';
import cookie from 'js-cookie';
import { COLOR_LIST } from './constants';



export const replaceImg = (src) => `https://test.img.pixivic.net/get/${src}`;

export function download(href, cb) {
  const eleLink = document.createElement('a');
  eleLink.download = '';
  eleLink.href = href;
  eleLink.click();
  eleLink.remove();
  cb && cb();
}

export function downloadImage(url, cb) {
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url,
      responseType: 'blob',
      onDownloadProgress(progress) {
        cb && cb(progress);
      },
    })
      .then((res) => {
        const url = URL.createObjectURL(res.data);
        download(url);
        resolve();
      })
      .catch((error) => {
        reject(error);
      });
  });
}

let last = 0;
export function randomColor() {
  last = (last + Math.round((Math.random() * COLOR_LIST.length) / 2 + 1))
    % COLOR_LIST.length;
  return COLOR_LIST[last];
}

export function debounceAsyncValidator(validator, delay) {
  let currentTimer = null;
  let currentPromiseReject = null;

  function debounce() {
    return new Promise((resolve, reject) => {
      currentTimer = setTimeout(() => {
        currentTimer = null;
        currentPromiseReject = null;
        resolve();
      }, delay);
      currentPromiseReject = reject;
    });
  }

  return function (value) {
    if (currentTimer) {
      currentPromiseReject(new Error('replaced'));
      clearTimeout(currentTimer);
      currentTimer = null;
    }

    return validator.call(this, value, debounce);
  };
}

export function replaceBigImg(url) {
  const supportedWebp = localStorage.getItem('supportedWebp');
  url = url.replace('_webp', '');
  // if (store.getters.isVip && store.getters.serverAddress) {
  //   url = url.replace('https://i.pximg.net', store.getters.serverAddress);
  //   url += `?Authorization=${cookie.get('jwt')}`;
  //   return url;
  // }
  return url.replace('i.pximg.net', 'o.acgpic.net');
  // return 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-b1ebbd3c-ca49-405b-957b-effe60782276/cd01bc83-878d-4bd0-81d2-aba831aadf5c.png';
}

export function replaceSmallImg(url) {
  return url.replace('i.pximg.net', 'acgpic.net');
  // return 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-b1ebbd3c-ca49-405b-957b-effe60782276/cd01bc83-878d-4bd0-81d2-aba831aadf5c.png';
}
