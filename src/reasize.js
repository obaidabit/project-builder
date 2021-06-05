export default function resize(ref, target) {
  if (!target || !ref) return;
  const iframe = document.querySelector("iframe");

  const rect = target.getBoundingClientRect();
  const frect = iframe.getBoundingClientRect();
  //const refRect = ref.getBoundingClientRect();

  if (rect.bottom >= frect.height) {
    ref.style.top = frect.top + rect.top + "px";
    ref.style.left = frect.left + rect.left + 20 + "px";
  } else {
    ref.style.top = frect.top + rect.top + rect.height + "px";
    ref.style.left = frect.left + rect.left + "px";
  }
}
