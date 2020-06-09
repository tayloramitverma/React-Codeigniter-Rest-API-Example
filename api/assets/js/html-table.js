var DatatableHtmlTableDemo= {
    init:function() {
        var e;
        e=$(".m-datatable").mDatatable( {
            data: {
                saveState: {
                    cookie: !1
                }
            }
            , search: {
                input: $("#generalSearch")
            },
            columns: [{
                field: "ID",
                width: 20,
                textAlign: "center"
            }]
            
        }
        )
    }
};
jQuery(document).ready(function() {
    DatatableHtmlTableDemo.init()
}

);