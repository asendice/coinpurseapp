import { Icon } from "semantic-ui-react";

const roundComma = (num) => {
  if (num) {
    return num.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  } else {
    return 0;
  }
};

const ifNegative = (num) => {
  if (num < 0) {
    const string = num.toString();
    return [string.slice(0, 1), "$", string.slice(1)].join("");
  } else {
    return `$${num}`;
  }
};

const rounder = (num) => {
  if (num && num.length > 7) {
    return Math.round(num * 10000) / 10000;
  } else {
    return Math.round(num * 100) / 100;
  }
};

const convertMc = (num) => {
  if (num >= 1000000000000) {
    return (num / 1000000000000).toFixed(2).replace(/\.00$/, "") + "T";
  }
  if (num >= 1000000000) {
    return (num / 1000000000).toFixed(2).replace(/\.0$/, "") + "B";
  }
  if (num >= 1000000) {
    return (num / 1000000).toFixed(2).replace(/\.0$/, "") + "M";
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(2).replace(/\.0$/, "") + "K";
  }
  return num;
};

const today = new Date();
const date =
  today.getMonth() + 1 + "-" + today.getDate() + "-" + today.getFullYear();
const time =
  today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

const copyRight = () => {
  return (
    <div>
      <a href="/" style={{ color: "black" }}>
        coinpurse.app <Icon name="copyright outline" /> 2021
      </a>
    </div>
  );
};

const renderArrow = (num) => {
  return (
    <Icon name={num === 0 ? "minus" : num >= 0 ? "arrow up" : "arrow down"} />
  );
};

export {
  roundComma,
  convertMc,
  date,
  time,
  copyRight,
  renderArrow,
  rounder,
  ifNegative,
};
