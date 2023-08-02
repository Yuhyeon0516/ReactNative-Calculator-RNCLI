//
//  CalculatorModule.swift
//  Calculator_RNCLI
//
//  Created by Yuhyeon Kim on 2023/08/02.
//

import Foundation

@objc(CalculatorModule)
class CalculatorModule:NSObject {
  @objc(executeCalc: numberA:numberB:resolver:rejector:)
  public func executeCalc(_ action:String, numberA:Int, numberB:Int, resolver:RCTPromiseResolveBlock, rejector:RCTPromiseRejectBlock) -> Void{
    if (action == "plus") {
      resolver(numberA + numberB)
      return
    }
    
    if (action == "minuse") {
      resolver(numberA - numberB)
      return
    }
    
    if (action == "multiply") {
      resolver(numberA * numberB)
      return
    }
    
    if (action == "divide") {
      resolver(numberA / numberB)
      return
    }
    
    rejector("Unexpected action type", action, nil)
  }
}
