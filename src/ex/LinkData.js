import React, {Component} from "react";

class LinkData extends Component {
    render() {        
        return (
        <>
            <tr>
                <td className="tx-ce">{this.props.jsonData.id}</td>
                <td>{this.props.jsonData.name}</td>
                <td>{this.props.jsonData.email}</td>
                <td>{this.props.jsonData.body}</td>
            </tr>
        </>
        )
    }
}
export default LinkData;