export function wait(time = 0, doReject = false) {
  return new Promise((resolve, reject) => {
    setTimeout(!doReject ? resolve : reject, time);
  });
}

export function waitAndReject(time) {
  return wait(time, true);
}