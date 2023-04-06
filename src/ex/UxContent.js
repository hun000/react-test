import React, {Component} from "react";
import axios from "axios";
import LinkData from './LinkData';
import PageNav from "./PageNav";
import SearchBar from "./SearchBar";

class UxContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            jsonData: [],
            total: 0,
            targetPage: 1,
            start: 1,
            end: 15,
            filterText: "",
            selectValue: "name"
        };
        this.handlePageNav = this.handlePageNav.bind(this);
        this.handleFilterChange = this.handleFilterChange.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
    }

    //컴포넌트 마운트시 아래 사이트에서 500개의 json 더미 데이터를 가져 옴.
    componentDidMount() {
        axios.get('https://jsonplaceholder.typicode.com/comments').then((res) => {            
            this.setState({ 
                jsonData: res.data,
                total: res.data.length                
            });           
        });    
    }

    //페이지 변화에 따른 값 set
    handlePageNav(data) {        
        this.setState({
            targetPage: data.targetPage,
            start: data.start,
            end: data.end
           
        });
    }

    handleFilterChange(filterText) {        
        this.setState({filterText: filterText});
    }    

    handleSelectChange(selectValue){
        console.log(`sv::: ${selectValue}`);
        this.setState({selectValue: selectValue});
    }
    

    render() {
        const jsonData = this.state.jsonData;        
        const totalRow = this.state.total;
        const targetPage = this.state.targetPage;

        const filterText = this.state.filterText;
        const selectValue = this.state.selectValue;        

        //tbody rows
        const rows = [];        
        const start = (this.state.start)-1;
        const end = (this.state.end)-1;
                
        //검색 추가
        if (jsonData.length !== 0) { 
            for(let i=start; i<=end; i++) {
                const seahchValue = selectValue !== "name" ? jsonData[i].email : jsonData[i].name;
                if(seahchValue.indexOf(filterText) === -1) continue;
                rows.push(<LinkData key={jsonData[i].id} jsonData={jsonData[i]} />);
            }
        }        

        if(rows.length === 0) rows.push(<tr key={0}><td colSpan={4}>no data</td></tr>);                    
        
        return (
            <>
               <SearchBar totalRow={totalRow} filterText={this.state.filterText} 
                    onFilterChange={this.handleFilterChange} 
                    onSelectChange={this.handleSelectChange} />
                <table className="tb-mg">
                    <thead>
                        <tr>
                            <th>no</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Body</th>
                        </tr>
                    </thead>
                    <tbody>{rows}</tbody>
                </table>
                <PageNav onPageChange={this.handlePageNav} totalRow={totalRow} targetPage={targetPage} />
            </>
        );        
    }    
}

export default UxContent;