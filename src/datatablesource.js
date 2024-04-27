export const userColumns = [
    { field: "id",
     headerName: "ID",
      width: 150 },


    {
        field: "username",
        headerName: "Username",
        width: 130,
        renderCell: (params) => {
            return (
                <div className="cellWithImg">
                    <img className="cellImg" src={params.row.img} alt="avatar" />
                    {params.row.username}
                </div>
            );
        },
    },
    {
        field: "displayName",
        headerName: "Name",
        width: 180,
    },
    {
        field: "email",
        headerName: "Email",
        width: 180,
    },

    {
        field: "address",
        headerName: "Address",
        width: 120,
    },
    {
        field: "country",
        headerName: "Country",
        width: 100,
    },
    {
        field: "password",
        headerName: "Password",
        width: 120,
    },
    
    {
        field: "phone",
        headerName: "Phone",
        width: 130,
    },
    
  
    // {
    //     field: "status",
    //     headerName: "Status",
    //     width: 160,
    //     renderCell: (params) => {
    //         return (
    //             <div className={`cellWithStatus ${params.row.status}`}>
    //                 {params.row.status}
    //             </div>
    //         );
    //     },
    // },
];
