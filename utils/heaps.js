class MinHeap {
  constructor() { this.data = [] }
  size() { return this.data.length }
  peek() { return this.data[0] }
  push(val) { this.data.push(val); this._bubbleUp(this.data.length - 1) }
  pop() {
    if (this.size() === 0) return null
    const root = this.data[0]
    const end = this.data.pop()
    if (this.size() > 0) { this.data[0] = end; this._bubbleDown(0) }
    return root
  }
  _bubbleUp(i) {
    const e = this.data[i]
    while (i > 0) {
      const p = Math.floor((i - 1) / 2)
      if (e >= this.data[p]) break
      this.data[i] = this.data[p]; this.data[p] = e; i = p
    }
  }
  _bubbleDown(i) {
    const e = this.data[i], l = this.data.length
    while (true) {
      let li = 2 * i + 1, ri = 2 * i + 2, swap = null
      if (li < l && this.data[li] < e) swap = li
      if (ri < l && (swap === null ? this.data[ri] < e : this.data[ri] < this.data[li])) swap = ri
      if (swap === null) break
      this.data[i] = this.data[swap]; this.data[swap] = e; i = swap
    }
  }
}

class MaxHeap {
  constructor() { this.data = [] }
  size() { return this.data.length }
  peek() { return this.data[0] }
  push(val) { this.data.push(val); this._bubbleUp(this.data.length - 1) }
  pop() {
    if (this.size() === 0) return null
    const root = this.data[0]
    const end = this.data.pop()
    if (this.size() > 0) { this.data[0] = end; this._bubbleDown(0) }
    return root
  }
  _bubbleUp(i) {
    const e = this.data[i]
    while (i > 0) {
      const p = Math.floor((i - 1) / 2)
      if (e <= this.data[p]) break
      this.data[i] = this.data[p]; this.data[p] = e; i = p
    }
  }
  _bubbleDown(i) {
    const e = this.data[i], l = this.data.length
    while (true) {
      let li = 2 * i + 1, ri = 2 * i + 2, swap = null
      if (li < l && this.data[li] > e) swap = li
      if (ri < l && (swap === null ? this.data[ri] > e : this.data[ri] > this.data[li])) swap = ri
      if (swap === null) break
      this.data[i] = this.data[swap]; this.data[swap] = e; i = swap
    }
  }
}

class MedianHeap {
  constructor() {
    this.low = new MaxHeap()
    this.high = new MinHeap()
  }
  add(num) {
    if (this.low.size() === 0 || num < this.low.peek()) this.low.push(num)
    else this.high.push(num)
    this._rebalance()
  }
  getMedian() {
    if (this.low.size() === this.high.size()) {
      if (this.low.size() === 0) return null
      return (this.low.peek() + this.high.peek()) / 2
    } else return this.low.peek()
  }
  _rebalance() {
    if (this.low.size() > this.high.size() + 1) this.high.push(this.low.pop())
    else if (this.high.size() > this.low.size()) this.low.push(this.high.pop())
  }
}

module.exports = { MinHeap, MaxHeap, MedianHeap }
