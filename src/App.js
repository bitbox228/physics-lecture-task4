import React, {useState} from 'react';
import Plot from 'react-plotly.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Row, Col, Form, Button} from 'react-bootstrap';

const App = () => {

    const [b, setB] = useState(5)
    const [s, setS] = useState(5)
    const [f, setF] = useState(5)
    const [r, setR] = useState(5)
    const [t, setT] = useState(1)

    const [x, setX] = useState()
    const [emfY, setEmfY] = useState()
    const [indY, setIndY] = useState()
    const [yRange, setYRange] = useState()

    const handleBChange = (e) => {
        setB(e.target.value)
    }

    const handleSChange = (e) => {
        setS(e.target.value)
    }

    const handleFChange = (e) => {
        setF(e.target.value)
    }

    const handleRChange = (e) => {
        setR(e.target.value)
    }

    const handleTChange = (e) => {
        setT(e.target.value)
    }

    const checkForms = () => {
        if (b === '') {
            alert('Введите B')
            return false
        }
        if (s === '') {
            alert('Введите S')
            return false
        }
        if (r === '') {
            alert('Введите R')
            return false
        }
        if (f === '') {
            alert('Введите f')
            return false
        }
        if (t === '') {
            alert('Введите t')
            return false
        }

        if (s < 0) {
            alert('Введите неотрицательное S')
            return false
        }
        if (r < 0) {
            alert('Введите неотрицательное R')
            return false
        }
        if (f < 0) {
            alert('Введите неотрицательное f')
            return false
        }
        if (t <= 0) {
            alert('Введите положительное t')
            return false
        }

        return true
    }

    const handlePlotUpdate = () => {
        if (!checkForms()) {
            return
        }

        const step = t / 1000

        const newX = Array.from(
            {length: 1000},
            (_, index) => index * step
        )

        const newEmfY = newX.map(index =>
            b * s * 2 * Math.PI * f * Math.sin(2 * Math.PI * f * index)
        )

        const newIndY = newEmfY.map(index =>
            index / r
        )

        const min = Math.min(...newEmfY, ...newIndY)
        const max = Math.max(...newEmfY, ...newIndY)
        const newYRange = [min - Math.abs(min) / 10, max + Math.abs(max) / 10];
        setYRange(newYRange)

        setX(newX)
        setEmfY(newEmfY)
        setIndY(newIndY)
    }


    return (
        <div className={"container-fluid"}>
            <h1>Моделирование электрогенератора: вращение контура в магнитном поле.</h1>
            <Row>
                <Col xs={12} md={3}>
                    <Form>
                        <div style={{marginBottom: '10px', marginTop: '70px'}}>
                            <Form.Group controlId="b">
                                <Form.Label>Величина магнитного поля, B (Тл)</Form.Label>
                                <Form.Control
                                    type="number"
                                    value={b}
                                    onChange={handleBChange}
                                />
                            </Form.Group>
                        </div>
                        <div style={{marginBottom: '10px'}}>
                            <Form.Group controlId="s">
                                <Form.Label>Площадь поперечного сечения проводника S (м<sup>2</sup>)</Form.Label>
                                <Form.Control
                                    type="number"
                                    value={s}
                                    onChange={handleSChange}
                                />
                            </Form.Group>
                        </div>
                        <div style={{marginBottom: '10px'}}>
                            <Form.Group controlId="number3">
                                <Form.Label>Сопротивление R (Ом)</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="number3"
                                    value={r}
                                    onChange={handleRChange}
                                />
                            </Form.Group>
                        </div>
                        <div style={{marginBottom: '10px'}}>
                            <Form.Group controlId="number4">
                                <Form.Label>Частота вращения f (Гц)</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="number4"
                                    value={f}
                                    onChange={handleFChange}
                                />
                            </Form.Group>
                        </div>
                        <div style={{marginBottom: '20px'}}>
                            <Form.Group controlId="number5">
                                <Form.Label>Время t (с)</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="number5"
                                    value={t}
                                    onChange={handleTChange}
                                />
                            </Form.Group>
                        </div>
                        <div>
                            <Button variant="primary" onClick={handlePlotUpdate}>Построить графики</Button>
                        </div>
                    </Form>
                </Col>
                <Col xs={12} md={9}>
                    <Plot
                        data={[
                            {
                                x: x,
                                y: emfY,
                                type: 'scatter',
                                mode: 'lines+points',
                                marker: {color: 'blue'},
                            },
                        ]}
                        layout={{
                            width: '800',
                            height: '420',
                            title: 'ЭДС',
                            xaxis: {title: 'Время, с'},
                            yaxis: {title: 'ЭДС, В', range: yRange}
                        }}
                    />
                    <Plot
                        data={[
                            {
                                x: x,
                                y: indY,
                                type: 'scatter',
                                mode: 'lines+points',
                                marker: {color: 'blue'},
                            },
                        ]}
                        layout={{
                            width: '800',
                            height: '420',
                            title: 'Индукционный ток',
                            xaxis: {title: 'Время, с'},
                            yaxis: {title: 'Индукционный ток, А', range: yRange}
                        }}
                    />
                </Col>
            </Row>
        </div>
    )
}

export default App
