import fetch from 'node-fetch'

const API_BASE = 'http://localhost:3001'

async function testCreatePayment() {
  console.log('测试创建支付订单...')

  try {
    const response = await fetch(`${API_BASE}/api/payment/create`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: 'test-user-id',
        plan: 'plus',
        paymentMethod: 'alipay'
      })
    })

    console.log('Response status:', response.status)
    console.log('Response headers:', response.headers.raw())

    const text = await response.text()
    console.log('Response text:', text)

    if (text) {
      const data = JSON.parse(text)
      console.log('Parsed data:', JSON.stringify(data, null, 2))
    }
  } catch (error) {
    console.error('Error:', error)
  }
}

async function testHealthCheck() {
  console.log('测试健康检查...')

  try {
    const response = await fetch(`${API_BASE}/health`)
    const data = await response.json()
    console.log('Health check:', data)
  } catch (error) {
    console.error('Error:', error)
  }
}

async function main() {
  await testHealthCheck()
  console.log('\n---\n')
  await testCreatePayment()
}

main()
