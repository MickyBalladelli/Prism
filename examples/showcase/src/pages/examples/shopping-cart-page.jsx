import { component, computed, createForm, html, keyed, signal } from '@mickyballadelli/matrix'
import { Alert, Avatar, Badge, Button, Card, EmptyState, FormField, PlusIcon, Stack, Tag, TextField, ToastRegion, createToastController } from 'prism-ui'
import { ExampleMetric, ExamplePageShell } from '../example-page-shell.jsx'

const products = [
  { id: 'mug', name: 'Matrix mug', price: 18, description: 'A sturdy ceramic mug for long reactive sessions.', tone: 'cyan', detail: 'Stoneware / 12 oz' },
  { id: 'hoodie', name: 'Signal hoodie', price: 64, description: 'Soft cotton fleece with a small signal badge.', tone: 'lilac', detail: 'Heavyweight / unisex' },
  { id: 'sticker', name: 'Computed sticker pack', price: 8, description: 'Five bright marks for your favorite laptop.', tone: 'citrus', detail: 'Vinyl / 5-piece set' }
]

const money = value => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value)

function ProductCard({ product, onAdd }) {
  return (
    <Card class={`shop-product-card shop-product-${product.tone}`}>
      <div class="shop-product-art" aria-hidden="true"><span></span><i></i></div>
      <div class="shop-product-copy">
        <div class="shop-product-title-row">
          <h3>{product.name}</h3>
          <strong>{money(product.price)}</strong>
        </div>
        <p>{product.description}</p>
        <span class="shop-product-detail">{product.detail}</span>
      </div>
      <footer class="card-actions">
        {Button({
          icon: PlusIcon({}),
          iconPosition: 'end',
          onClick: () => onAdd(product),
          children: 'Add to cart'
        })}
      </footer>
    </Card>
  )
}

function CartLine({ line, onChange }) {
  return (
    <li class="shop-cart-line">
      <div class={`shop-cart-line-art shop-product-art shop-product-${line.product.tone}`} aria-hidden="true"><span></span><i></i></div>
      <div class="shop-cart-line-copy">
        <strong>{line.product.name}</strong>
        <span>{money(line.product.price)} each</span>
      </div>
      <label class="shop-quantity-label">
        <span>Qty</span>
        <input type="number" min="0" max="99" value={line.quantity} aria-label={`Quantity for ${line.product.name}`} onInput={event => onChange(line.product.id, Number(event.currentTarget.value) || 0)} />
      </label>
      <strong class="shop-line-total">{money(line.total)}</strong>
    </li>
  )
}

function CartSummary({ total, count, onCheckout }) {
  return (
    <Card class="shop-summary-card">
      <div class="shop-summary-heading">
        <div>
          <p class="eyebrow">Order summary</p>
          <h3>Ready when you are.</h3>
        </div>
        <Badge value={count} tone="info" ariaLabel={computed(() => `${count.value} items in cart`)} />
      </div>
      <div class="shop-summary-total"><span>Total</span><strong>{computed(() => money(total.value))}</strong></div>
      <p class="shop-summary-note">Free delivery included. Taxes calculated at checkout.</p>
      <Button fullWidth onClick={onCheckout} disabled={computed(() => count.value === 0)}>Continue to checkout</Button>
    </Card>
  )
}

export function ShoppingCartPage({ example, link }) {
  const activeView = signal('catalog')
  const cart = signal([])
  const orderStatus = signal('')
  const submitting = signal(false)
  const checkout = createForm({ email: '', address: '' }, {
    email: value => /^\S+@\S+\.\S+$/.test(value) ? undefined : 'Enter a valid email',
    address: value => value.trim() ? undefined : 'Enter a delivery address'
  }, { name: 'showcase-checkout' })
  const toastController = createToastController()

  const cartLines = computed(() => cart.value.map(item => {
    const product = products.find(candidate => candidate.id === item.id)
    return product ? { product, quantity: item.quantity, total: product.price * item.quantity } : null
  }).filter(Boolean))
  const cartCount = computed(() => cart.value.reduce((total, item) => total + item.quantity, 0))
  const cartTotal = computed(() => cartLines.value.reduce((total, line) => total + line.total, 0))
  const productViews = computed(() => keyed(products.map(product => component(ProductCard, { product, onAdd: addToCart }, product.id)), product => product.props.product.id))
  const cartLineViews = computed(() => keyed(cartLines.value.map(line => component(CartLine, { line, onChange: changeQuantity }, line.product.id)), line => line.props.line.product.id))
  const checkoutErrors = computed(() => Object.entries(checkout.errors.value).map(([field, message]) => html`<li key=${field}>${message}</li>`))
  const orderFeedback = computed(() => orderStatus.value
    ? Alert({ tone: 'success', title: 'Order placed', children: orderStatus.value })
    : null)

  function addToCart(product) {
    cart.update(items => {
      const existing = items.find(item => item.id === product.id)
      return existing
        ? items.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)
        : [...items, { id: product.id, quantity: 1 }]
    })
    toastController.push({ tone: 'info', title: 'Added to cart', children: `${product.name} is ready for checkout.`, duration: 2600 })
  }

  function changeQuantity(id, quantity) {
    cart.update(items => quantity > 0
      ? items.map(item => item.id === id ? { ...item, quantity } : item)
      : items.filter(item => item.id !== id))
  }

  function openView(view) {
    activeView.value = view
    if (view === 'checkout') {
      orderStatus.value = ''
    }
  }

  async function submitCheckout(event) {
    event.preventDefault()
    if (Object.keys(checkout.validate()).length > 0 || cart.value.length === 0) {
      if (!cart.value.length) orderStatus.value = 'Add an item before checking out.'
      return
    }

    submitting.value = true
    orderStatus.value = ''
    await new Promise(resolve => setTimeout(resolve, 350))
    cart.value = []
    submitting.value = false
    orderStatus.value = 'Your order is confirmed. A receipt is on its way.'
    toastController.push({ tone: 'success', title: 'Checkout complete', children: 'Thanks for shopping with Prism Supply.' })
    activeView.value = 'catalog'
  }

  const catalogView = computed(() => (
    <section class="shop-content" aria-labelledby="shop-catalog-title">
      <div class="shop-section-heading">
        <div>
          <p class="eyebrow">Small-batch objects</p>
          <h2 id="shop-catalog-title">Keep your desk in sync.</h2>
        </div>
        <p>Useful things for focused work, shipped from a deliberately tiny catalog.</p>
      </div>
      <ul class="shop-product-grid">{productViews}</ul>
      <Card class="shop-promise-card">
        <div class="shop-promise-mark" aria-hidden="true">✦</div>
        <div><p class="eyebrow">The Prism promise</p><h3>Less noise. More signal.</h3><p>Every item is chosen to make the work surface feel a little more considered.</p></div>
        <Tag tone="success">In stock</Tag>
      </Card>
    </section>
  ))

  const cartView = computed(() => (
    <section class="shop-content" aria-labelledby="shop-cart-title">
      <div class="shop-section-heading">
        <div><p class="eyebrow">Your selection</p><h2 id="shop-cart-title">A cart with no surprises.</h2></div>
        <p>Adjust quantities here. Your total stays live as you decide.</p>
      </div>
      {cartLines.value.length
        ? <div class="shop-cart-layout"><Card class="shop-cart-card"><ul class="shop-cart-list">{cartLineViews}</ul></Card><CartSummary total={cartTotal} count={cartCount} onCheckout={() => openView('checkout')} /></div>
        : <EmptyState title="Your cart is clear" description="Pick something from the catalog and it will appear here." action={<Button onClick={() => openView('catalog')}>Browse catalog</Button>} />}
    </section>
  ))

  const checkoutView = computed(() => (
    <section class="shop-content" aria-labelledby="shop-checkout-title">
      <div class="shop-section-heading">
        <div><p class="eyebrow">Secure handoff</p><h2 id="shop-checkout-title">Finish the signal.</h2></div>
        <p>One small form. Clear feedback. No hidden steps.</p>
      </div>
      <div class="shop-checkout-layout">
        <Card class="shop-checkout-card">
          <form onSubmit={submitCheckout}>
            <FormField label="Email" required hint="We send the receipt here." error={computed(() => checkout.errors.value.email)} control={control => TextField({ ...control, type: 'email', autocomplete: 'email', value: checkout.fields.email })} />
            <FormField label="Delivery address" required hint="A street address is enough for this demo." error={computed(() => checkout.errors.value.address)} control={control => TextField({ ...control, autocomplete: 'street-address', value: checkout.fields.address })} />
            <ul class="shop-form-errors" role="alert">{checkoutErrors}</ul>
            <div class="shop-checkout-actions"><Button type="submit" loading={submitting} loadingLabel="Placing order">Place order</Button><Button variant="secondary" type="button" onClick={() => openView('cart')}>Back to cart</Button></div>
          </form>
          {orderFeedback}
        </Card>
        <Card class="shop-checkout-aside">
          <p class="eyebrow">Today’s order</p>
          <div class="shop-summary-total"><span>{cartCount} items</span><strong>{computed(() => money(cartTotal.value))}</strong></div>
          <Stack gap="small"><span><strong>Delivery</strong> Free</span><span><strong>Returns</strong> 30 days</span><span><strong>Support</strong> Human, always</span></Stack>
          <Tag tone="success">Encrypted demo flow</Tag>
        </Card>
      </div>
    </section>
  ))

  const activeContent = computed(() => activeView.value === 'cart' ? cartView : activeView.value === 'checkout' ? checkoutView : catalogView)

  return (
    <ExamplePageShell example={example} link={link}>
      <section class="example-window shop-window" aria-label="Prism Supply shopping cart">
        <header class="shop-app-header">
          <div class="shop-brand"><span class="shop-brand-mark" aria-hidden="true">P</span><div><strong>Prism Supply</strong><small>Objects for focused work</small></div></div>
          <div class="shop-account"><Tag tone="success">Demo store</Tag><Avatar name="Ada Lovelace" status="online" size="small" /></div>
        </header>
        <div class="shop-metrics"><ExampleMetric label="Catalog" value="03" detail="small-batch objects" tone="info" /><ExampleMetric label="Delivery" value="Free" detail="on every order" tone="success" /><ExampleMetric label="Cart" value={cartCount} detail="items selected" tone="accent" /></div>
        <nav class="shop-nav" aria-label="Store views">
          <Button variant={computed(() => activeView.value === 'catalog' ? 'primary' : 'secondary')} onClick={() => openView('catalog')}>Catalog</Button>
          <Button variant={computed(() => activeView.value === 'cart' ? 'primary' : 'secondary')} onClick={() => openView('cart')}>Cart <Badge value={cartCount} tone="info" /></Button>
          <Button variant={computed(() => activeView.value === 'checkout' ? 'primary' : 'secondary')} onClick={() => openView('checkout')} disabled={computed(() => cartCount.value === 0)}>Checkout</Button>
        </nav>
        <div class="shop-active-view">{activeContent}</div>
        <ToastRegion toasts={toastController.toasts} onDismiss={toastController.dismiss} position="bottom-end" ariaLabel="Store notifications" />
      </section>
    </ExamplePageShell>
  )
}
