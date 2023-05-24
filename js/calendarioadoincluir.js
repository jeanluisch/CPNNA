$(function() {
                            var hoy = new Date();
                            var minimaFecha = new Date();
                            minimaFecha.setFullYear(1930, 0, 1);
                            $( "#fnacimiento" ).datepicker({
                                changeMonth: true,
                                changeYear: true,
                                dateFormat: "yy-mm-dd",
                                onClose: function(){
                             

                                }
                                /*maxDate: hoy,*/
                                /*minDate : hoy*/
                            });
                        });
