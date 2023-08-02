//
//  CalculatorModuleBridge.m
//  Calculator_RNCLI
//
//  Created by Yuhyeon Kim on 2023/08/02.
//

#import <React/RCTBridgeModule.h>


@interface RCT_EXTERN_MODULE (CalculatorModule, NSObject)

RCT_EXTERN_METHOD(executeCalc: (NSString *) action
                  numberA: (int) numberA
                  numberB: (int) numberB
                  resolver: (RCTPromiseResolveBlock) resolve
                  rejector: (RCTPromiseRejectBlock) reject
                  )

@end

