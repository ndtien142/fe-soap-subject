import dayjs from "dayjs";

export function toQueryString(objParams) {
  const str = [];
  for (const p in objParams) {
    if (Object.prototype.hasOwnProperty.call(objParams, p) && objParams[p]) {
      str.push(
        decodeURIComponent(
          `${encodeURIComponent(p)}=${encodeURIComponent(objParams[p])}`
        )
      );
    }
  }
  return str.join("&");
}

export function toUrl(url, query) {
  return `${url}?${toQueryString(query)}`;
}

export function getMessError(message) {
  if (typeof message === "string") {
    return message;
  }
  return message[0] || "Lỗi không xác định!";
}

export function getUniqueArray(originArray) {
  return [...new Set(originArray)];
}

export function formatDate(date, format) {
  return dayjs(date).format(format || "DD/MM/YYYY HH:mm");
}

export function formatDateNoTime(date, format) {
  return dayjs(date).format(format || "DD/MM/YYYY");
}

export function isValidURL(url) {
  const pattern = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  );
  return !!pattern.test(url);
}
