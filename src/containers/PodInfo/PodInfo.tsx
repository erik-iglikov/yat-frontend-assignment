import { PodType } from 'types'

import './pod-info.module.scss'

export const PodInfo = ({ data }: { data: PodType }) => {
    return (
        <article className="pod-info">
            <div className="cover-container">
                <img
                    className='cover'
                    src={data?.cover.url}
                    alt="Collection cover" />
            </div>

            <div className="content">
                <h2 className="name">{data?.name}</h2>
                <p className="description">{data?.description}</p>
            </div>
        </article>
    )
}