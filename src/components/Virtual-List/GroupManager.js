/*
* MIT License

 Copyright (c) 2018 Weijia Wang

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in all
 copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 SOFTWARE. */
import SectionManager from './SectionManager';

/** Represents a group of logically-related items */
export default class GroupManager {
  constructor(group, groupId, sectionSize, cellSizeAndPositionGetter, unwatch) {
    this._groupId = groupId;
    this._sectionSize = sectionSize;
    this._cellSizeAndPositionGetter = cellSizeAndPositionGetter;
    this._unwatch = unwatch;
    this.totalHeight = 0;
    this.totalWidth = 0;
    this.updateGroup(group);
  }

  updateGroup(group) {
    const sectionManager = new SectionManager(this._sectionSize);
    let totalHeight = 0;
    let totalWidth = 0;

    group.forEach((item, index) => {
      const cellMetadatum = this._cellSizeAndPositionGetter(item, index, this._groupId);
      sectionManager.registerCell({
        index,
        cellMetadatum,
      });

      // compute total height and total width
      const {
        x, y, width, height,
      } = cellMetadatum;
      const bottom = y + height;
      const right = x + width;
      if (bottom > totalHeight) {
        totalHeight = bottom;
      }
      if (right > totalWidth) {
        totalWidth = right;
      }
    });

    sectionManager.freezeCells();

    this._group = group;
    this._sectionManager = sectionManager;
    this.totalHeight = totalHeight;
    this.totalWidth = totalWidth;
  }

  getCellIndices(region) {
    return this._sectionManager.getCellIndices(region);
  }

  getCellMetadata(index) {
    return this._sectionManager.getCellMetadata(index);
  }

  getItem(index) {
    return this._group[index];
  }

  dispose() {
    this._unwatch();
  }
}
