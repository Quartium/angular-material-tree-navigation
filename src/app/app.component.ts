import { NestedTreeControl } from '@angular/cdk/tree';
import { Component } from '@angular/core';
import { MatTreeNestedDataSource, MatTreeModule } from '@angular/material/tree';

/**
 * Food data with nested structure.
 * Each node has a name and an optional list of children.
 */
interface FoodNode {
  name: string;
  icon: string;
  children?: FoodNode[];
}

const TREE_DATA: FoodNode[] = [
  {
    name: 'Delivery',
    icon: 'delivery_dining',
    children: [
      { name: 'Pizza', icon: 'local_pizza' },
      { name: 'Burger', icon: 'lunch_dining' },
      { name: 'Ramen', icon: 'ramen_dining' },
      { name: 'Tapas', icon: 'tapas' },
    ],
  },
  {
    name: 'Fridgle',
    icon: 'kitchen',
    children: [
      { name: 'Croissant', icon: 'bakery_dining' },
      { name: 'Cake', icon: 'cake' },
      { name: 'Egg', icon: 'egg' },
    ],
  },
  {
    name: 'Local Bar',
    icon: 'local_bar',
    children: [
      { name: 'Beer', icon: 'sports_bar' },
      { name: 'Liquor', icon: 'liquor' },
      { name: 'Wine', icon: 'wine_bar' },
      { name: 'Coffee', icon: 'coffee' },
    ],
  },
];

/**
 * @title Tree with nested nodes
 */

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  menuCompressed = false;
  treeControl = new NestedTreeControl<FoodNode>((node) => node.children);
  dataSource = new MatTreeNestedDataSource<FoodNode>();
  activeNode: FoodNode | null;

  constructor() {
    this.dataSource.data = TREE_DATA;
  }

  /**
   * Checks if a node has children.
   * @param _ The index of the node.
   * @param node The node to check.
   * @returns True if the node has children, false otherwise.
   */
  hasChild = (_: number, node: FoodNode) =>
    !!node.children && node.children.length > 0;

  /**
   * Handles the click event on a tree node.
   * @param node The clicked node.
   */
  handleNodeClick(node: FoodNode) {
    if (this.menuCompressed) {
      if (this.activeNode && this.activeNode !== node) {
        this.treeControl.collapse(this.activeNode);
      }

      if (this.treeControl.isExpanded(node)) {
        this.treeControl.collapse(node);
      } else {
        this.treeControl.expand(node);
      }

      this.activeNode = node;
    } else {
      // For the case when menuCompressed is false, toggle expansion normally
      if (this.treeControl.isExpanded(node)) {
        this.treeControl.collapse(node);
      } else {
        this.treeControl.expand(node);
      }
    }
  }

  /**
   * Toggles the menu compression state.
   */
  public compressMenu() {
    this.menuCompressed = !this.menuCompressed;
    this.treeControl.collapseAll();
  }
}
