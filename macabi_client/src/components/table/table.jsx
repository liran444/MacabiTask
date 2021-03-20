import React from "react";
import "./table.css";

const TableComponent = (props) => {
    return (
        <div className="mainPage">
            <table className="mainPage">
                <thead className="mainPage">
                    <tr className="mainPage">
                        {/* Iterating through an array of fields to display as column headers */}
                        {props.fields?.map((field, index) => (
                            // Setting an onclick sort by ASC / DESC function
                            <th key={index} onClick={() => props.onClickedSortColumn(`${field}`)}>
                                {field.toUpperCase()}
                                <span>
                                    {props.isColumnSorted[field] ? (props.isColumnSorted[field] === 'asc' ? ' ⇧' : " ⇩") : ''}
                                </span>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="mainPage">
                    {/* Iterating through the object to display its values */}
                    {props.data?.map((object, index) => (
                        <tr key={index} className="mainPage">
                            {/* Displaying its values by keys */}
                            {Object.keys(object).map((key, index) => (
                                <td key={index}>{object[key]}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default TableComponent;