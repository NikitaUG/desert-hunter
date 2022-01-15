function detectPosition(x0, y0) {
  try {
    return { left: SIZE * x0, top: SIZE * y0 };
  } catch (_) {}

  return { top: 0, left: 0 };
}


function getDirectionAttribute(x0, y0) {
  const result = {
    "0 0": "none",
    "1 0": "right",
    "1 1": "right-top",
    "0 1": "top",
    "-1 1": "left-top",
    "-1 0": "left",
    "-1 -1": "right-bottom",
    "0 -1": "bottom",
    "1 -1": "left-bottom",
  }[`${x0} ${y0}`];

  return result;
}
