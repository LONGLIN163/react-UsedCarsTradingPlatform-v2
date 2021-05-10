import React from 'react'
import moment from 'moment'



export const id = {
    title: 'id',
    dataIndex: 'id',
    key: 'id',
    sorter: true
    // ,
    // sortOrder: (() => {
    //     if (this.props.sortInfo.sortBy == 'id') {
    //         return this.props.sortInfo.sortDirection == 1 ? 'ascend' : 'descend'
    //     }
    //     return false;
    // })()
}
export const brand = {
    title: 'brand',
    dataIndex: 'brand',
    key: 'brand',
}
export const thumnails = {
    title: 'thumnails',
    dataIndex: 'imgs',
    key: 'imgs',
    render(text, record) {
        return <div data-img={record.id}>
            <img className="previewThumbnail" src={`/carimgs_small/${record.id}/view/tb${record.imgs.view[0]}`} alt="" />
        </div>
    }
}
export const series = {
    title: 'series',
    dataIndex: 'series',
    key: 'series',
}
export const color = {
    title: 'color',
    dataIndex: 'color',
    key: 'color',
}
export const buydate = {
    title: 'buydate',
    dataIndex: 'buydate',
    key: 'buydate',
    render(text, record, index) {
        return <span>{moment(text).format("YYYY-MM-DD")}</span>
    },
    sorter: true
    // ,
    // sortOrder: (() => {
    //     if (this.props.sortInfo.sortBy == 'buydate') {
    //         return this.props.sortInfo.sortDirection == 1 ? 'ascend' : 'descend'
    //     }
    //     return false;
    // })()
}
export const displacement = {
    title: 'displacement',
    dataIndex: 'displacement',
    key: 'displacement',
}
export const fuel = {
    title: 'fuel',
    dataIndex: 'fuel',
    key: 'fuel',
}
export const price = {
    title: 'price',
    dataIndex: 'price',
    key: 'price',
    sorter: true
    // ,
    // sortOrder: (() => {
    //     if (this.props.sortInfo.sortBy == 'price') {
    //         return this.props.sortInfo.sortDirection == 1 ? 'ascend' : 'descend'
    //     }
    //     return false;
    // })()
}
export const km = {
    title: 'km',
    dataIndex: 'km',
    key: 'km',
    sorter: true
    // ,
    // sortOrder: (() => {
    //     if (this.props.sortInfo.sortBy == 'km') {
    //         return this.props.sortInfo.sortDirection == 1 ? 'ascend' : 'descend'
    //     }
    //     return false;
    // })()
}
export const licenseplate = {
    title: 'licenseplate',
    dataIndex: 'licenseplate',
    key: 'licenseplate',
    render(text, record) {
        return record.licenseplate ? <span>Yes</span> : <span>No</span>
    }
}
export const locality = {
    title: 'locality',
    dataIndex: 'locality',
    key: 'locality',
    render(text, record) {
        return record.locality ? <span>Yes</span> : <span>No</span>
    }
}
export const eco = {
    title: 'eco',
    dataIndex: 'eco',
    key: 'eco',
}
export const gearbox = {
    title: 'gearbox',
    dataIndex: 'gearbox',
    key: 'gearbox',
}
export const type = {
    title: 'type',
    dataIndex: 'type',
    key: 'type',
}
