var FormControls= {
    init:function() {
        
        $("#addPage").validate( {
            rules: {
                page_name: {
                    required: !0
                }
            }
            , invalidHandler:function(e, r) {
                mUtil.scrollTo("addPage", -200), swal( {
                    title:"", text:"There are some errors in your submission. Please correct them.", type:"error", confirmButtonClass:"btn btn-secondary m-btn m-btn--wide", onClose:function(e) {
                        console.log("on close event fired!")
                    }
                }
                ), e.preventDefault()
            }
            , submitHandler:function(e) {

                var formData = new FormData(e);
                    jQuery.ajax({
                        type: "POST",
                        url: baseURL+"update-page",
                        data: formData,
                        processData: false,
                        contentType: false,
                        success:function(data) {
                            console.log(data);
                            var nwmsg = data.split('|');

                            if(nwmsg[0]=='success'){
                                window.location.href=baseURL+"page-listing";
                            }else if(nwmsg[0]=='error'){
                                var ermsg = nwmsg[1];
                                mApp.unprogress(n), swal( {
                                    title: "", text: ermsg, type: "error", confirmButtonClass: "btn btn-secondary m-btn m-btn--wide"
                                });
                            }
                        }
                });

                return false;
         
            }
        })
    }
};

jQuery(document).ready(function() {
    FormControls.init()
});