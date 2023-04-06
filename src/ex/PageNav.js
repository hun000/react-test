import React, {Component} from "react";

function getPage(targetPage, pageScale, blockSacle, totalRow) {    
    totalPage = parseInt(totalRow % pageScale === 0 ? (totalRow / pageScale) : (totalRow / pageScale) + 1);
    if (totalPage === 0) totalPage = 1;       

    if (typeof page === "string") {
        currentPage = parseInt(targetPage);
        if (isNaN(currentPage)) currentPage = 1;
    } else {
        currentPage = targetPage;
    }  

    currentBlock = parseInt((currentPage % blockSacle) === 0 ? (currentPage / blockSacle) : (currentPage / blockSacle) + 1);
    startPage = parseInt(1 + (currentBlock - 1) * blockSacle);
    endPage = parseInt(blockSacle + (currentBlock - 1) * blockSacle);

    if(totalPage <= endPage) {
        endPage = totalPage;
    }
}

class PageNav extends Component {
    constructor(props){
        super(props);
        this.handlePageMove = this.handlePageMove.bind(this);        
    }

    //부모에게 변화된 값을 전달.
    handlePageMove(e) {                
        const targetPage = e.target.value;
        
        if(targetPage > 0) {
            start = parseInt(1 + (targetPage -1 ) * pageScale);
            end = parseInt(pageScale + (targetPage -1 ) * pageScale);

            const totalRow =  this.props.totalRow;
            if(end > totalRow) end = totalRow;

            this.props.onPageChange({
                targetPage: targetPage,
                start: start,
                end: end
            });
        }
    }
    
    render() {
        const totalRow = this.props.totalRow;
        let targetPage = this.props.targetPage;

        getPage(targetPage, pageScale, blockSacle, totalRow);

        const pageNum = [];
        let prevBtn, nextBtn;

        for (let i=startPage; i<=endPage; i++) {
            if(currentPage === i) {
                pageNum.push(<li key={i}>{i}</li>);
            } else {
                pageNum.push(<li className="cursor-pt" key={i} value={i} onClick={this.handlePageMove} >{i}</li>);
            }
        }

        if(currentBlock > 1) {
            prevBtn = <li className="cursor-pt" value={(startPage-blockSacle)} onClick={this.handlePageMove} >&laquo;</li>
        } else {
            prevBtn = <li>&laquo;</li>
        }
        
        if(totalPage > endPage) {
            nextBtn = <li className="cursor-pt" value={(endPage+1)} onClick={this.handlePageMove} >&raquo;</li>
        } else {
            nextBtn = <li>&raquo;</li>
        }

        return (
            <div className="tx-ce">
                <ul className="page">
                    {prevBtn}
                    {pageNum}
                    {nextBtn}
                </ul>
            </div>
        );
    };
}

const pageScale = 15, blockSacle = 10;
let totalPage, currentPage, currentBlock = 0, start, end, startPage, endPage;

export default PageNav;