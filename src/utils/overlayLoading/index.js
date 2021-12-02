import { useLoading } from "vue3-loading-overlay";
import "vue3-loading-overlay/dist/vue3-loading-overlay.css";

const loader = useLoading()
export function showLoading(){
 loader.show({
  color: 'blue',
  loader: 'spinner',
  width: 64,
  height: 64,
  backgroundColor: '#ffffff',
  opacity: 0.8,
  zIndex: 999,
});
}

export function hideLoading(){
 loader.hide();
}