import React, {Component} from "react";

class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
    }

    handleTextChange(e) {
       this.props.onFilterChange(e.target.value);
    }

    handleSelectChange(e) {
        console.log(e.target.value);
        this.props.onSelectChange(e.target.value);
    }

    render() {
        const options = ['name', 'email', 'body'];
        return (
            <div>
                <p className="tit">React JSON Data Test</p>                    
                <div className="tot">
                    Total. {this.props.totalRow}
                   <select className="in" onChange={this.handleSelectChange} value={this.props.selectValue}>
                        {options.map((opt, idx) => {
                            return <option value={opt} key={idx}>{opt}</option>
                        })}
                   </select>
                   <input type="text" value={this.props.filterText} onChange={this.handleTextChange} />
                </div>
            </div>
        );
    }
}

export default SearchBar;