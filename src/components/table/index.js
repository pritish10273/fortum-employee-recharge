import React from "react";
import "./table.css";




const Table=({data, columns})=>{
    return (
        <div>
            <table>
                <thead>
                    <tr>
                        {columns.map((head)=>(
                            <th>{head.header}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row)=>(
                        <tr>
                            {columns.map((col)=>(
                                <td>{row[col.field]}</td>
                            ))}
                          <td> <button >Show details</button></td>
           
                        
                        </tr>
                    ))}

                </tbody>

            </table>
        </div>
    )
};
export default Table;