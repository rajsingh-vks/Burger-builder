import React,{ Component } from 'react';

import Modal from '../../components/UI/Modal/Modal';
// import Aux from '../Aux';

const WithErrorHandler = ( WrappedComponent, axios ) => {
    return class extends Component {
        state = {
            error : null
        }
        componentWillMount () {
            this.reqCustomTnterceptor = axios.interceptors.request.use(req => {
               this.setState({error: null});
               return req;
            });
            this.resCustomTnterceptor = axios.interceptors.response.use(res => res, error => {
               this.setState({error: error});
            });
        }
       componentWillUnmount() {
          // console.log('Will Unmount', this.reqCustomTnterceptor, this.reqCustomTnterceptor);
           axios.interceptors.request.eject(this.reqCustomTnterceptor);
           axios.interceptors.response.eject(this.reqCustomTnterceptor)
       }
        errorConfirmedHandler = () => {
            this.setState({error: null});
       }

       render () {
        const Aux = (props) => props.children;
           return (
            <Aux>
                <Modal 
                    show={this.state.error}
                    modalClosed={this.errorConfirmedHandler}>
                    {this.state.error ? this.state.error.message : null}
                </Modal>
               <WrappedComponent {...this.props}/>
            </Aux>
           );
       }
    }
}    

export default WithErrorHandler;



// const WithErrorHandler = ( WrappedComponent, axios ) => {
//     return class extends Component {
//         state = {
//             error: null
//         }

//         componentWillMount () {
//             axios.interceptors.request.use(req => {
//                 this.setState({error: null});
//                 return req;
//             });
//             axios.interceptors.response.use(res => res, error => {
//                 this.setState({error: error});
//             });
//         }

//         errorConfirmedHandler = () => {
//             this.setState({error: null});
//         }

//         render () {
//             return (
//                 <Aux>
//                     <Modal 
//                         show={this.state.error}
//                         modalClosed={this.errorConfirmedHandler}>
//                         {this.state.error ? this.state.error.message : null}
//                     </Modal>
//                     <WrappedComponent {...this.props} />
//                 </Aux>
//             );
//         }
//     }
// }

// export default WithErrorHandler;