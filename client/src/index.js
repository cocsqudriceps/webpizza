import React from 'react'
import ReactDOM from 'react-dom'
import { createBrowserHistory } from 'history'
import './css/index.css'
import {Router} from "react-router-dom";
import {useRoutes} from "./routes";

const browserHistory = createBrowserHistory()
const routes = useRoutes(false)
ReactDOM.render(<Router history={browserHistory}>{routes}</Router>, document.getElementById('root'))
