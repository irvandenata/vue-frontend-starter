import Swal from "sweetalert2";

export function toast(text,icon) {
   const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer:1000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    });
    Toast.fire({
       icon: icon,
       title: text
     })
 }
 
 export function swal(text) {
          Swal.fire({
            text: text,
            icon: "error",
            heightAuto: false,
            confirmButtonText: "Close",
          });
 }

 export  async  function swalConfirm(status) {
  await Swal.fire({
  title: 'Are you sure?',
  text: "You won't be able to revert this!",
  icon: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
  
  if (result.isConfirmed) {
  status.value=true
    Swal.fire(
      'Deleted!',
      'Your file has been deleted.',
      'success'
    )
  }
})
 return status.value
 }