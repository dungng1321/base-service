export default function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}

export function serilize(data) {
  if (data.length > 0) {
    const serilizeData = [];
    data.forEach((record) => {
      serilizeData[record.id] = record;
    });
    return serilizeData;
  }
  return data;
}

export function genCacheKey(name: string) {
  return `AUTH_SERVICE.${name}`;
}

export const isDevMode = () => {
  return (
    process.env.NODE_ENV.startsWith('dev') ||
    process.env.NODE_ENV.startsWith('local')
  );
};
